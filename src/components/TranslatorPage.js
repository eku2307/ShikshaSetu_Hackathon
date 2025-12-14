// src/components/TranslatorPage.js
import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Volume2, Copy, RotateCcw } from 'lucide-react';

const TranslatorPage = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Punjabi');
  const [isTranslating, setIsTranslating] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'pa', name: 'Punjabi', flag: '🇮🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ur', name: 'Urdu', flag: '🇵🇰' }
  ];

  // Sample translations for demo purposes
  const sampleTranslations = {
    'Hello': {
      'Punjabi': 'ਸਤ ਸਰੀ ਅਕਾਲ',
      'Hindi': 'नमस्ते',
      'Urdu': 'السلام علیکم'
    },
    'Thank you': {
      'Punjabi': 'ਧੰਨਵਾਦ',
      'Hindi': 'धन्यवाद',
      'Urdu': 'شکریہ'
    },
    'Good morning': {
      'Punjabi': 'ਸ਼ੁਭ ਸਵੇਰ',
      'Hindi': 'सुप्रभात',
      'Urdu': 'صبح بخیر'
    },
    'How are you?': {
      'Punjabi': 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?',
      'Hindi': 'आप कैसे हैं?',
      'Urdu': 'آپ کیسے ہیں؟'
    },
    'Computer': {
      'Punjabi': 'ਕੰਪਿਊਟਰ',
      'Hindi': 'कंप्यूटर',
      'Urdu': 'کمپیوٹر'
    },
    'Education': {
      'Punjabi': 'ਸਿੱਖਿਆ',
      'Hindi': 'शिक्षा',
      'Urdu': 'تعلیم'
    },
    'Student': {
      'Punjabi': 'ਵਿਦਿਆਰਥੀ',
      'Hindi': 'छात्र',
      'Urdu': 'طالب علم'
    },
    'Teacher': {
      'Punjabi': 'ਅਧਿਆਪਕ',
      'Hindi': 'शिक्षक',
      'Urdu': 'استاد'
    },
    'Book': {
      'Punjabi': 'ਕਿਤਾਬ',
      'Hindi': 'पुस्तक',
      'Urdu': 'کتاب'
    },
    'School': {
      'Punjabi': 'ਸਕੂਲ',
      'Hindi': 'विद्यालय',
      'Urdu': 'اسکول'
    }
  };

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Check if we have a sample translation
      const translation = sampleTranslations[inputText.trim()];
      if (translation && translation[toLang]) {
        setTranslatedText(translation[toLang]);
      } else {
        // Simulate translation with placeholder
        setTranslatedText(`[${fromLang} → ${toLang}]: ${inputText}`);
      }
      setIsTranslating(false);
    }, 1000);
  };

  const swapLanguages = () => {
    const tempLang = fromLang;
    setFromLang(toLang);
    setToLang(tempLang);
    
    // Also swap the texts if both have content
    if (inputText && translatedText) {
      const tempText = inputText;
      setInputText(translatedText);
      setTranslatedText(tempText);
    }
  };

  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Text copied to clipboard!');
    });
  };

  const speakText = (text, language) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Set language code based on selection
      const langCodes = { 'English': 'en-US', 'Punjabi': 'pa-IN', 'Hindi': 'hi-IN', 'Urdu': 'ur-PK' };
      utterance.lang = langCodes[language] || 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in your browser');
    }
  };

  return (
    <div className="content-spacing">
      <div className="dark-card">
        <h2 className="dark-card-header">🌐 Language Translator</h2>
        <p className="dark-card-description">
          Translate text between English, Punjabi, Hindi, and Urdu to help bridge communication gaps in rural education.
        </p>

        {/* Quick Phrases */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f3f4f6', marginBottom: '12px' }}>
            📚 Quick Phrases
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.keys(sampleTranslations).map(phrase => (
              <button
                key={phrase}
                onClick={() => setInputText(phrase)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#374151',
                  border: '1px solid #6b7280',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  color: '#f3f4f6'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#4b5563';
                  e.target.style.borderColor = '#9ca3af';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#374151';
                  e.target.style.borderColor = '#6b7280';
                }}
              >
                {phrase}
              </button>
            ))}
          </div>
        </div>
        
        {/* Language Selection */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr auto 1fr', 
          gap: '16px', 
          alignItems: 'end',
          marginBottom: '24px' 
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#d1d5db' }}>
              From:
            </label>
            <div style={{ position: 'relative' }}>
              <select 
                value={fromLang} 
                onChange={(e) => setFromLang(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #4b5563',
                  borderRadius: '8px',
                  backgroundColor: '#1f2937',
                  color: '#f3f4f6',
                  fontSize: '16px',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23f3f4f6\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px'
                }}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#f3f4f6' }}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={swapLanguages}
            style={{
              padding: '12px',
              backgroundColor: '#f59e0b',
              color: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d97706';
              e.target.style.transform = 'rotate(180deg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f59e0b';
              e.target.style.transform = 'rotate(0deg)';
            }}
            title="Swap languages"
          >
            <ArrowRightLeft size={20} />
          </button>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#d1d5db' }}>
              To:
            </label>
            <select 
              value={toLang} 
              onChange={(e) => setToLang(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #4b5563',
                borderRadius: '8px',
                backgroundColor: '#1f2937',
                color: '#f3f4f6',
                fontSize: '16px',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23f3f4f6\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6,9 12,15 18,9\'%3e%3c/polyline%3e%3c/svg%3e")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '16px'
              }}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.name} style={{ backgroundColor: '#1f2937', color: '#f3f4f6' }}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Translation Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Input Section */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#d1d5db' }}>
              Enter text in {fromLang}:
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Type your text in ${fromLang}...`}
                style={{
                  width: '100%',
                  height: '150px',
                  padding: '12px',
                  border: '2px solid #4b5563',
                  borderRadius: '8px',
                  backgroundColor: '#1f2937',
                  color: '#f3f4f6',
                  resize: 'none',
                  fontSize: '16px',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f59e0b'}
                onBlur={(e) => e.target.style.borderColor = '#4b5563'}
              />
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                gap: '4px'
              }}>
                {inputText && (
                  <>
                    <button
                      onClick={() => speakText(inputText, fromLang)}
                      style={{
                        padding: '6px',
                        backgroundColor: '#374151',
                        border: '1px solid #6b7280',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: '#f3f4f6'
                      }}
                      title="Listen"
                    >
                      <Volume2 size={14} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(inputText)}
                      style={{
                        padding: '6px',
                        backgroundColor: '#374151',
                        border: '1px solid #6b7280',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: '#f3f4f6'
                      }}
                      title="Copy"
                    >
                      <Copy size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Output Section */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#d1d5db' }}>
              Translation in {toLang}:
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '100%',
                height: '150px',
                padding: '12px',
                border: '2px solid #4b5563',
                borderRadius: '8px',
                backgroundColor: '#374151',
                overflowY: 'auto',
                fontSize: '16px',
                fontFamily: 'inherit'
              }}>
                {isTranslating ? (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    color: '#9ca3af'
                  }}>
                    <Languages size={24} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} />
                    Translating...
                  </div>
                ) : translatedText ? (
                  <p style={{ color: '#f3f4f6', margin: 0, lineHeight: '1.5' }}>
                    {translatedText}
                  </p>
                ) : (
                  <p style={{ color: '#6b7280', margin: 0, fontStyle: 'italic' }}>
                    Translation will appear here...
                  </p>
                )}
              </div>
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                display: 'flex',
                gap: '4px'
              }}>
                {translatedText && !isTranslating && (
                  <>
                    <button
                      onClick={() => speakText(translatedText, toLang)}
                      style={{
                        padding: '6px',
                        backgroundColor: '#374151',
                        border: '1px solid #6b7280',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: '#f3f4f6'
                      }}
                      title="Listen"
                    >
                      <Volume2 size={14} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(translatedText)}
                      style={{
                        padding: '6px',
                        backgroundColor: '#374151',
                        border: '1px solid #6b7280',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        color: '#f3f4f6'
                      }}
                      title="Copy"
                    >
                      <Copy size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleTranslate}
            disabled={!inputText.trim() || isTranslating}
            style={{
              backgroundColor: inputText.trim() && !isTranslating ? '#f59e0b' : '#4b5563',
              color: inputText.trim() && !isTranslating ? '#1f2937' : '#9ca3af',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: inputText.trim() && !isTranslating ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (inputText.trim() && !isTranslating) {
                e.target.style.backgroundColor = '#d97706';
              }
            }}
            onMouseLeave={(e) => {
              if (inputText.trim() && !isTranslating) {
                e.target.style.backgroundColor = '#f59e0b';
              }
            }}
          >
            <Languages size={20} />
            {isTranslating ? 'Translating...' : 'Translate'}
          </button>

          <button
            onClick={clearAll}
            style={{
              backgroundColor: '#374151',
              color: '#f3f4f6',
              border: '2px solid #6b7280',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#4b5563';
              e.target.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#374151';
              e.target.style.borderColor = '#6b7280';
            }}
          >
            <RotateCcw size={20} />
            Clear All
          </button>
        </div>

        {/* Usage Tips */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          backgroundColor: '#1e3a8a',
          border: '1px solid #3b82f6',
          borderRadius: '8px'
        }}>
          <h4 style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            color: '#60a5fa', 
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            💡 Translation Tips
          </h4>
          <ul style={{ 
            color: '#93c5fd', 
            fontSize: '14px', 
            marginLeft: '16px',
            lineHeight: '1.6'
          }}>
            <li>Try the quick phrases above for common educational terms</li>
            <li>Use the speaker icon to hear pronunciations</li>
            <li>Swap languages quickly with the arrow button</li>
            <li>Copy translations to use in other applications</li>
            <li>This tool works offline for basic phrases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;