import React, { useState, useEffect } from 'react';
import { supportAPI } from '../api/api';
import Header from '../components/Header';
import './SupportPage.css';

function SupportPage() {
  const [faqs, setFaqs] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupportData();
  }, []);

  const fetchSupportData = async () => {
    try {
      const [faqResponse, instResponse] = await Promise.all([
        supportAPI.getFAQ(),
        supportAPI.getInstructions()
      ]);
      setFaqs(faqResponse.data.faqs);
      setInstructions(instResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching support data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="support-page">
        <Header />
        <div className="support-container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="support-page">
      <Header />
      <div className="support-container">
        <h1>Support & Help</h1>
        
        <div className="faq-section">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <h3 className="faq-question">Q: {faq.question}</h3>
                <p className="faq-answer">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="instructions-section">
          <h2>Instructions</h2>
          
          <div className="instruction-card">
            <h3>For Administrators</h3>
            <ol>
              {instructions.admin_instructions?.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>

          <div className="instruction-card">
            <h3>For Team Owners</h3>
            <ol>
              {instructions.team_owner_instructions?.map((instruction, idx) => (
                <li key={idx}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="contact-section">
          <h2>Need More Help?</h2>
          <p>If you need additional assistance, please contact the system administrator or reach out through the support channels.</p>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;

