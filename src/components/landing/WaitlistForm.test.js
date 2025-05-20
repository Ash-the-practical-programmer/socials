import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import WaitlistForm from './WaitlistForm.vue'; // Adjust path as necessary

// Mock global fetch
global.fetch = vi.fn();

// Mock import.meta.env
const MOCK_API_URL = 'http://mock-waitlist-api.com/api/send-gmail';
// vi.mock('import.meta.env', () => ({ // This type of mock might not always work as expected for import.meta.env
//   VITE_WAITLIST_API_URL: MOCK_API_URL,
// }));


describe('WaitlistForm.vue', () => {
  let wrapper;
  const ORIGINAL_ENV = { ...process.env }; // Store original env

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch.mockReset();

    // Set the environment variable that the component will use via import.meta.env
    process.env.VITE_WAITLIST_API_URL = MOCK_API_URL;
    
    // Mount the component AFTER setting the environment variable
    wrapper = mount(WaitlistForm);
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV }; // Restore original environment variables
    // Clean up
    vi.restoreAllMocks(); // Restores all mocks including global.fetch
  });

  // Helper function to set email and submit form
  const submitEmail = async (email) => {
    await wrapper.find('input[type="email"]').setValue(email);
    await wrapper.find('form').trigger('submit.prevent');
  };

  it('renders the form correctly', () => {
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').text()).toBe('Join Now');
  });

  it('handles successful form submission', async () => {
    const testEmail = 'test@example.com';
    // Mock a successful fetch response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Successfully added!' }),
    });

    await submitEmail(testEmail);

    // Check fetch call
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      MOCK_API_URL, // Check against the mocked URL
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: testEmail }),
      })
    );

    // Wait for state updates and UI changes
    await wrapper.vm.$nextTick(); // For immediate state changes from submit
    await wrapper.vm.$nextTick(); // For changes after promise resolution
    
    // Check UI updates for success
    expect(wrapper.find('button[type="submit"]').text()).toBe('Welcome!');
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined();
    expect(wrapper.find('input[type="email"]').attributes('disabled')).toBeDefined();
    
    const successMessage = wrapper.find('.alert-success');
    expect(successMessage.exists()).toBe(true);
    expect(successMessage.text()).toContain('Successfully added!');
  });

  it('handles invalid email input (client-side validation)', async () => {
    const invalidEmail = 'not-an-email';
    await submitEmail(invalidEmail);

    // Fetch should not be called
    expect(global.fetch).not.toHaveBeenCalled();

    // Check for error message display
    await wrapper.vm.$nextTick();
    const errorMessage = wrapper.find('.alert-error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Please enter a valid email address.');
    
    // Form should not be in submitted state
    expect(wrapper.find('button[type="submit"]').text()).toBe('Join Now');
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined();
  });

  it('handles API error during submission', async () => {
    const testEmail = 'apierror@example.com';
    // Mock a failed fetch response (network error or non-ok status)
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    await submitEmail(testEmail);

    // Check fetch call
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      MOCK_API_URL,
      expect.objectContaining({ body: JSON.stringify({ emails: testEmail }) })
    );

    // Check for error message display
    await wrapper.vm.$nextTick(); 
    await wrapper.vm.$nextTick(); 
    
    const errorMessage = wrapper.find('.alert-error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Internal Server Error'); 
    
    // Form should not be in successfully submitted state, button should be re-enabled
    expect(wrapper.find('button[type="submit"]').text()).toBe('Join Now');
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined();
    expect(wrapper.vm.hasSubmitted).toBe(false); // Check internal state if needed
  });
  
  it('handles fetch throwing an error (e.g. network failure)', async () => {
    const testEmail = 'networkerror@example.com';
    global.fetch.mockRejectedValueOnce(new Error('Network failure'));

    await submitEmail(testEmail);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    
    const errorMessage = wrapper.find('.alert-error');
    expect(errorMessage.exists()).toBe(true);
    expect(errorMessage.text()).toContain('Network failure'); 
    
    expect(wrapper.find('button[type="submit"]').text()).toBe('Join Now');
    expect(wrapper.vm.hasSubmitted).toBe(false);
  });

  it('does not submit if email is empty', async () => {
    await submitEmail('');
    expect(global.fetch).not.toHaveBeenCalled();
    // No error message for empty, just no submission. Or could add one.
    // Current component logic: if (!email.value || hasSubmitted.value) return;
    // So, no specific error message for empty, just prevents submission.
  });

  it('shows loading state during submission', async () => {
    const testEmail = 'loading@example.com';
    // Make fetch take time
    global.fetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({ message: 'Success!' }),
      }), 100))
    );

    await wrapper.find('input[type="email"]').setValue(testEmail);
    // Trigger submit but don't await the full completion of handleSubmit yet
    wrapper.find('form').trigger('submit.prevent');

    // Check immediately after triggering submit (before promise resolves)
    await wrapper.vm.$nextTick(); // Allow isSubmitting to update
    expect(wrapper.find('button[type="submit"]').text()).toBe('Joining...');
    expect(wrapper.find('button[type="submit"]').classes()).toContain('loading'); // DaisyUI loading class

    // Allow the promise to resolve and all updates to occur
    await new Promise(resolve => setTimeout(resolve, 150)); // Wait for mock fetch to complete
    await wrapper.vm.$nextTick(); // Allow component to update after fetch
    await wrapper.vm.$nextTick(); // Another tick for safety

    expect(wrapper.find('button[type="submit"]').text()).toBe('Welcome!');
  });
});
