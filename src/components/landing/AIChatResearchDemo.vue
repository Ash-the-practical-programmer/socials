<template>
    <section class="py-16 sm:py-24 bg-base-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 class="text-3xl sm:text-4xl font-bold text-base-content mb-3">
            Interact with Your Data, Naturally
          </h2>
          <p class="text-lg text-base-content/80 max-w-xl mx-auto">
            Ask questions, request summaries, and explore insights using a simple chat interface.
          </p>
        </div>
  
        <div class="max-w-2xl mx-auto bg-base-200 rounded-xl shadow-2xl p-4 sm:p-6 overflow-hidden animate-fade-in-up animation-delay-200">
          <div class="flex items-center mb-4 pb-3 border-b border-base-300/50">
            <div class="avatar placeholder mr-3">
              <div class="bg-primary text-neutral-content rounded-full w-10 h-10">
                <span class="text-xl font-bold">AI</span>
              </div>
            </div>
            <h3 class="font-semibold text-base-content text-lg">SocialAI Research Assistant</h3>
          </div>
  
          <div class="space-y-5 h-[350px] sm:h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <!-- User Message -->
            <div class="chat chat-end">
              <div class="chat-bubble chat-bubble-secondary text-secondary-content">
                "Show me recent discussions about 'sustainable packaging' on Twitter."
              </div>
            </div>
  
            <!-- AI Message -->
            <div class="chat chat-start">
               <div class="chat-image avatar placeholder">
                <div class="w-8 rounded-full bg-primary text-neutral-content">
                  <span class="text-xs">AI</span>
                </div>
              </div>
              <div class="chat-bubble chat-bubble-neutral text-neutral-content">
                <p class="font-medium mb-1">Okay, analyzing recent tweets...</p>
                <p>Found <strong>1,200+ mentions</strong> in the last 24h. Key themes emerging are:</p>
                <ul class="list-disc list-inside text-xs space-y-1 mt-1 opacity-90">
                  <li>Consumer demand for eco-friendly options.</li>
                  <li>Innovations in biodegradable materials.</li>
                  <li>Criticism of greenwashing by major brands.</li>
                </ul>
                <div class="text-xs opacity-70 mt-2">Sentiment: Mostly Positive (65%)</div>
              </div>
            </div>
            
            <!-- User Message -->
            <div class="chat chat-end">
              <div class="chat-bubble chat-bubble-secondary text-secondary-content">
                "Can you summarize the sentiment around Brand X's new campaign?"
              </div>
            </div>
  
             <!-- AI Message with typing indicator -->
            <div class="chat chat-start">
               <div class="chat-image avatar placeholder">
                <div class="w-8 rounded-full bg-primary text-neutral-content">
                  <span class="text-xs">AI</span>
                </div>
              </div>
              <div class="chat-bubble chat-bubble-neutral text-neutral-content">
                <span class="loading loading-dots loading-sm"></span> Processing...
              </div>
            </div>
            
             <!-- AI Message (follow up) -->
            <div class="chat chat-start">
               <div class="chat-image avatar placeholder">
                <div class="w-8 rounded-full bg-primary text-neutral-content">
                  <span class="text-xs">AI</span>
                </div>
              </div>
              <div class="chat-bubble chat-bubble-neutral text-neutral-content">
                <p>Sentiment for Brand X's new campaign is <strong>mixed</strong>.</p>
                 <p class="text-xs mt-1 opacity-90">Positive (40%): Praise for creativity. <br/>Negative (35%): Concerns about authenticity. <br/>Neutral (25%): General discussion.</p>
                <button class="btn btn-xs btn-accent mt-2">View Detailed Report</button>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <style scoped>
  .animation-delay-200 { animation-delay: 0.2s; }
  
  /* Custom scrollbar for the chat demo */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--fallback-b2, oklch(var(--b2) / 1)); /* DaisyUI base-200 */
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--fallback-a, oklch(var(--a) / 1)); /* DaisyUI accent */
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: var(--fallback-ac, oklch(var(--ac) / 1)); /* DaisyUI accent-content or darker accent */
  }
  </style>