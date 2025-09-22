// Email service with multiple fallback options
export const emailService = {
  // Option 1: FormSubmit.co (free service)
  async sendViaFormSubmit(formData) {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_subject', `New Contact Form Message from ${formData.name}`);
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_template', 'table');
      formDataToSend.append('_next', window.location.href);

      const response = await fetch('https://formsubmit.co/vaibhavbpatil1210@gmail.com', {
        method: 'POST',
        body: formDataToSend
      });

      return response.ok;
    } catch (error) {
      console.error('FormSubmit error:', error);
      return false;
    }
  },

  // Option 2: EmailJS (more reliable, requires setup)
  async sendViaEmailJS(formData) {
    try {
      // This requires EmailJS setup - you'll need to sign up at emailjs.com
      // and add your service ID, template ID, and user ID
      if (window.emailjs) {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'vaibhavbpatil1210@gmail.com'
        };

        const response = await window.emailjs.send(
          'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
          'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
          templateParams,
          'YOUR_USER_ID' // Replace with your EmailJS user ID
        );

        return response.status === 200;
      }
      return false;
    } catch (error) {
      console.error('EmailJS error:', error);
      return false;
    }
  },

  // Option 3: Netlify Forms (if deployed on Netlify)
  async sendViaNetlify(formData) {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend).toString()
      });

      return response.ok;
    } catch (error) {
      console.error('Netlify forms error:', error);
      return false;
    }
  },

  // Main send function that tries multiple methods
  async sendEmail(formData) {
    // Try FormSubmit first
    let success = await this.sendViaFormSubmit(formData);
    
    if (success) {
      return { success: true, method: 'FormSubmit' };
    }

    // Try EmailJS if available
    success = await this.sendViaEmailJS(formData);
    if (success) {
      return { success: true, method: 'EmailJS' };
    }

    // Try Netlify forms if available
    success = await this.sendViaNetlify(formData);
    if (success) {
      return { success: true, method: 'Netlify' };
    }

    return { success: false, method: 'None' };
  }
};
