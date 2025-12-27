// Essential Configuration
const config = {
    // Supabase Database (Free Tier)
    SUPABASE_URL: 'https://vkqswulxmuuganmjqumb.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcXN3dWx4bXV1Z2FubWpxdW1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3ODc3OTQsImV4cCI6MjA4MjM2Mzc5NH0.LsZKX2aThok0APCNXr9yQ8FnuJnIw6v8RsTIxVLFB4U',
    
    // File Upload Limits
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
    ALLOWED_TYPES: ['image/*', 'video/*', 'audio/*', 'application/pdf', 'text/*'],
    
    // Network
    NETWORK_NAME: 'Sepolia Testnet',
    DEMO_MODE: false
};