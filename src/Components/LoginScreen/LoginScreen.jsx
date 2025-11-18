import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import './LoginScreen.css';

export default function LoginScreen({ onLoginSuccess }) {
  const [id, setId] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [key, setKey] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const correctKey = '2%TX-Pg6D-HN';
  const verifyTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (verifyTimeout.current) clearTimeout(verifyTimeout.current);
    };
  }, []);

  const handleKeyChange = (e) => {
    const v = e.target.value;
    setKey(v);
    setVerified(false);
    if (verifyTimeout.current) clearTimeout(verifyTimeout.current);
    if (v.trim() === '') {
      setVerifying(false);
      return;
    }
    setVerifying(true);
    // simulate verification delay
    verifyTimeout.current = setTimeout(() => {
      const ok = v === correctKey;
      setVerified(ok);
      setVerifying(false);
    }, 800);
  };

  const canLogin = id.trim() !== '' && agreed && verified;

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (canLogin) {
      try { localStorage.setItem('seenLogin','1'); } catch(e){}
      onLoginSuccess && onLoginSuccess();
    }
  };

  return (
    <div className="login-overlay">
      <form className="glass-card" dir="rtl" onSubmit={handleSubmit}>
        <div className="logo-wrap" aria-hidden>
          <svg className="apple-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M16.365 1.43c0 1.02-.38 2.01-1.06 2.73-.73.79-1.78 1.46-2.9 1.26-.12-.02-.25-.03-.37-.03.03-.06.08-.13.14-.23.37-.64.63-1.36.67-2.11.05-1.05-.33-1.93-1.14-2.58.92-.12 1.82.27 2.66.9.62.44 1.12 1.05 1.43 1.95zM12.1 6.08c.66-.02 1.47.2 2.22.48.68.25 1.42.52 2.01.5.23 0 .44-.05.63-.11-.18.7-.52 1.36-1.02 1.86-.76.74-1.77 1.12-2.85 1.12-.6 0-1.2-.09-1.74-.32-.64-.27-1.22-.68-1.63-1.23-.49-.68-.76-1.45-.78-2.3.65.26 1.36.38 2.17.33.48-.03.97-.08 1.59-.33zM7.4 8.7c.33 1.48 1.34 2.72 2.74 3.48.96.52 2.14.95 3.4.95 1.26 0 2.35-.39 3.22-1.07.53-.4 1.01-.9 1.39-1.29l.02-.01c.06-.05.12-.11.18-.17-1.14 3.4-4.02 5.7-7.8 5.7-2.18 0-4-.68-5.46-1.9-1.46-1.22-2.47-2.92-2.76-5.01.83-.05 1.7.2 2.55.31.1.01.19.02.29.02.46.01.9-.03 1.29-.09z"/>
          </svg>
        </div>

        <h1 className="neon-title">Apple M-Hack</h1>

        <p className="welcome">مرحبًا! اكتب الـ ID الخاص بك على منصة 1xBet وتأكد من التسجيل باستخدام الكود الترويجي <strong>1xAPPLEx</strong></p>

        <label className="field-label">الـ ID على 1xBet</label>
        <input className="text-input" value={id} onInput={(e) => setId(e.target.value)} placeholder="أدخل الـ ID" />

        {id.trim() !== '' && (
          <label className="agree-row">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>أوافق على الشروط والأحكام وأنني طبقت جميع الشروط بنجاح</span>
          </label>
        )}

        <label className="field-label">المفتاح</label>
        <input
          type="password"
          className="text-input"
          value={key}
          onInput={handleKeyChange}
          placeholder="Enter Your Key"
        />

        <div className="verify-row">
          {key.trim() !== '' && (
            <>
              {verifying && <div className="verifying">التحقق…</div>}
              {!verifying && verified && <div className="verified">✔️ المفتاح صحيح</div>}
              {!verifying && !verified && <div className="not-verified">✖️ المفتاح غير صحيح</div>}
            </>
          )}
        </div>

        <p className="note">للحصول على المفتاح الخاص بك راسلنا على التليجرام <a href="https://t.me/Army_Hackersian" target="_blank" rel="noreferrer">https://t.me/Army_Hackersian</a></p>

        <button type="submit" className="enter-btn" disabled={!canLogin} onClick={handleSubmit}>
          دخول
        </button>
      </form>
    </div>
  );
}
