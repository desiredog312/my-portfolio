/**
 * EmailJS configuration — fill in the three values below (see SETUP.md, step 3).
 *
 * These three values are PUBLIC by design: EmailJS runs in the visitor's browser, so
 * they are visible to anyone who opens the page's source. That is expected and fine.
 * What makes them safe is configuring EmailJS correctly (see SETUP.md → "Protecting
 * your EmailJS quota").
 *
 * NEVER put any of the following in this repository:
 *   - an EmailJS *Private Key* (Account → Security)
 *   - an email account password or Gmail "App Password"
 *   - any other secret token
 */
window.PORTFOLIO_CONFIG = {
  emailjs: {
    publicKey:  'g22BcCHXlu6dYfAJ8',   // Account → API keys / General → Public Key
    serviceId:  'service_07p9ku9',   // Email Services → your service → Service ID  (service_xxxxxxx)
    templateId: 'template_vjbt6cb'   // Email Templates → your template → Template ID (template_xxxxxxx)
  }
};
