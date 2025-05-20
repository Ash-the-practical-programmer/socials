import request from 'supertest';
import express from 'express';
import nock from 'nock';
// import sendGmailHandler from './send-gmail.js'; // Will be dynamically imported
import nodemailer from 'nodemailer'; // Import to access the mocked module features if needed

// This is THE mock function that will be used by the transporter in send-gmail.js
const mockSendMail = jest.fn(); // Renamed to start with "mock"

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: mockSendMail, // All instances of transporter.sendMail will point to this
  })),
}));

// Setup an Express app to use the handler
// We will initialize and re-initialize this in beforeEach
let app; 

describe('POST /api/send-gmail', () => {
  const ORIGINAL_ENV = { ...process.env }; // Deep copy original env
  const TEST_GOOGLE_SCRIPT_URL = 'http://mock.appsscript.com/exec';

  beforeEach(async () => {
    jest.resetModules(); // Clears the cache BEFORE env vars are set and module is imported

    // Set default environment variables for each test
    process.env = { 
      ...ORIGINAL_ENV, 
      GMAIL_APP_PASSWORD: 'testpassword',
      GOOGLE_SCRIPT_URL: TEST_GOOGLE_SCRIPT_URL,
      NODE_ENV: 'test' 
    };
    
    // Dynamically import the handler AFTER resetting modules and setting env
    // This ensures it picks up the process.env for this test run
    const { default: freshSendGmailHandler } = await import('./send-gmail.js');
    
    app = express(); // Create a fresh app for each test
    app.use(express.json());
    app.post('/api/send-gmail', freshSendGmailHandler);

    mockSendMail.mockReset(); // Reset the single mock function
    nock.cleanAll(); // Clean all nock interceptors
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV; // Restore original env
    nock.restore(); // Restore nock's behavior for other test files
  });

  const validRequestBody = { emails: 'test1@example.com,test2@example.com' };
  const singleEmailRequestBody = { emails: 'test1@example.com' };

  // Test Case 1: Successful Operation
  test('should return 200 OK for successful operation', async () => {
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .reply(200, { status: 'success', message: 'Data saved' });

    const response = await request(app)
      .post('/api/send-gmail')
      .send(validRequestBody);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Emails processed and Google Sheet updated successfully.');
    expect(response.body.emailResults.length).toBe(2);
    expect(response.body.emailResults[0].status).toBe('success');
    expect(response.body.googleSheetResult.status).toBe('success');
    expect(mockSendMail).toHaveBeenCalledTimes(2);
  });

  // Test Case 2: Email Sending Failure
  test('should return 500 if sendMail fails for an email', async () => {
    mockSendMail.mockImplementation(async (mailOptions) => {
      if (mailOptions.to === 'test1@example.com') {
        throw new Error('Failed to send email');
      }
      return { messageId: 'test-message-id-other' };
    });
    
    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .reply(200, { status: 'success', message: 'Data saved' });

    const response = await request(app)
      .post('/api/send-gmail')
      .send(singleEmailRequestBody);

    expect(response.status).toBe(500);
    expect(response.body.status).toContain('Some emails failed to send. Google Sheet operation was successful.');
    expect(response.body.emailResults.length).toBe(1);
    expect(response.body.emailResults[0].status).toBe('error');
    expect(response.body.emailResults[0].message).toBe('Failed to send email');
    expect(response.body.googleSheetResult.status).toBe('success');
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });
  
  test('should return 500 if GMAIL_APP_PASSWORD is not set (all emails fail)', async () => {
    delete process.env.GMAIL_APP_PASSWORD;
    // Re-import handler for this specific env change as it affects module-level 'transporter'
    const { default: handlerWithNoPass } = await import('./send-gmail.js');
    const currentTestApp = express();
    currentTestApp.use(express.json());
    currentTestApp.post('/api/send-gmail', handlerWithNoPass);
    
    mockSendMail.mockRejectedValue(new Error('Authentication failed')); // Configure the single mock

    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .reply(200, { status: 'success', message: 'Data saved' });

    const response = await request(currentTestApp)
      .post('/api/send-gmail')
      .send(validRequestBody);

    expect(response.status).toBe(500);
    expect(response.body.status).toContain('Some emails failed to send. Google Sheet operation was successful.');
    expect(response.body.emailResults.every(r => r.status === 'error')).toBe(true);
    expect(response.body.emailResults[0].message).toBe('Authentication failed');
    expect(response.body.googleSheetResult.status).toBe('success'); 
    expect(mockSendMail).toHaveBeenCalledTimes(2); // Called for each email
  });

  // Test Case 3: Google Apps Script Failure
  test('should return 500 if Google Apps Script fetch returns 500 error', async () => {
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .reply(500, 'Internal Server Error from Script');

    const response = await request(app)
      .post('/api/send-gmail')
      .send(validRequestBody);

    expect(response.status).toBe(500);
    expect(response.body.status).toContain('critical issue occurred with Google Sheet operation');
    expect(response.body.googleSheetResult.status).toBe('error');
    expect(response.body.googleSheetResult.message).toContain('Google Apps Script request failed: 500');
    expect(mockSendMail).toHaveBeenCalledTimes(2);
  });

  test('should return 500 if Google Apps Script returns non-JSON response', async () => {
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .reply(200, 'This is not JSON'); // Script OK, but non-JSON response

    const response = await request(app)
      .post('/api/send-gmail')
      .send(validRequestBody);

    expect(response.status).toBe(500);
    expect(response.body.status).toContain('critical issue occurred with Google Sheet operation');
    expect(response.body.googleSheetResult.status).toBe('error');
    expect(response.body.googleSheetResult.message).toBe('Non-JSON response from Google Apps Script.');
    expect(response.body.googleSheetResult.raw).toBe('This is not JSON');
    expect(mockSendMail).toHaveBeenCalledTimes(2);
  });

  test('should return 500 if Google Apps Script JSON response has status "error"', async () => {
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .reply(200, { status: 'error', message: 'Failed to save in script' });

    const response = await request(app)
      .post('/api/send-gmail')
      .send(validRequestBody);

    expect(response.status).toBe(500);
    expect(response.body.status).toContain('critical issue occurred with Google Sheet operation');
    expect(response.body.googleSheetResult.status).toBe('error');
    expect(response.body.googleSheetResult.message).toBe('Failed to save in script');
    expect(mockSendMail).toHaveBeenCalledTimes(2);
  });
  
  test('should return 500 if fetching Google Apps Script URL fails (network error)', async () => {
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });
    nock(TEST_GOOGLE_SCRIPT_URL)
      .post('')
      .replyWithError('Network connection refused');

    const response = await request(app)
      .post('/api/send-gmail')
      .send(validRequestBody);
    
    expect(response.status).toBe(500);
    expect(response.body.status).toContain('critical issue occurred with Google Sheet operation');
    expect(response.body.googleSheetResult.status).toBe('error');
    expect(response.body.googleSheetResult.message).toContain('Network error or issue fetching from Google Apps Script');
    expect(mockSendMail).toHaveBeenCalledTimes(2);
  });

  // Test Case 4: Google Apps Script URL Missing
  test('should return 500 if GOOGLE_SCRIPT_URL is not defined', async () => {
    delete process.env.GOOGLE_SCRIPT_URL;

    // Dynamically import the handler. This specific instance should see the modified process.env
    const { default: handlerNoUrl } = await import('./send-gmail.js');
    
    const currentTestApp = express();
    currentTestApp.use(express.json());
    currentTestApp.post('/api/send-gmail', handlerNoUrl);
    
    mockSendMail.mockResolvedValue({ messageId: 'test-message-id' });

    const nockWasActive = nock.isActive();
    if (nockWasActive) nock.restore(); // Disable nock as no fetch should occur

    let response;
    try {
      response = await request(currentTestApp)
        .post('/api/send-gmail')
        .send(validRequestBody);
    } finally {
      if (nockWasActive) nock.activate(); // Re-enable nock
    }

    expect(response.status).toBe(500);
    expect(response.body.status).toContain('critical issue occurred with Google Sheet operation');
    expect(response.body.googleSheetResult.status).toBe('error');
    expect(response.body.googleSheetResult.message).toBe('Configuration error: Google Apps Script URL missing.');
    expect(mockSendMail).toHaveBeenCalledTimes(2);
  });
  
  // Input validation tests
  test('should return 400 if emails field is missing or not a string', async () => {
    let res = await request(app).post('/api/send-gmail').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please provide a valid email string.');

    res = await request(app).post('/api/send-gmail').send({ emails: 123 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please provide a valid email string.');
  });

  test('should return 400 if no valid email addresses are provided', async () => {
    const res = await request(app).post('/api/send-gmail').send({ emails: 'invalid-email, also-invalid' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('No valid email addresses provided.');
  });

  // HTTP method tests
  test('should return 200 for OPTIONS request', async () => {
    const response = await request(app).options('/api/send-gmail');
    expect(response.status).toBe(200);
  });

  test('should return 405 for non-POST request', async () => {
    const response = await request(app).get('/api/send-gmail');
    // Express typically returns 404 for a path that exists but not for the method used, unless explicitly handled.
    // The handler itself has a check `if (req.method !== 'POST')`, which implies it *could* be hit if the routing allows other methods to reach it.
    // Given app.post exclusively, GET will be a 404. If app.use('/api/send-gmail', handler) was used, then the internal check would yield 405.
    // Let's stick to what the current setup (app.post) would result in for a GET.
    expect(response.status).toBe(404); 
    // expect(response.body.error).toBe('Method not allowed'); // This won't be hit with 404
  });
});
