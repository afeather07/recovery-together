import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="footer-brand">
          <span className="brand-mark">RT</span>
          <p className="footer-tagline">
            Recovery Together — peer support for 7-OH and kratom recovery. Not
            medical treatment.
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <h3>Community</h3>
            <Link href="/explore">Explore rooms</Link>
            <Link href="/journey">My Journey</Link>
            <Link href="/resources">Resources</Link>
          </div>
          <div>
            <h3>Support</h3>
            <Link href="/safety">Safety &amp; crisis resources</Link>
            <Link href="/resources/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <h3>About</h3>
            <Link href="/about">About Recovery Together</Link>
            <Link href="/community-guidelines">Community Guidelines</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>

      <p className="footer-bottom">
        Recovery Together does not provide medical treatment, diagnosis, or
        emergency monitoring. If you are in danger, call 911 (US) or go to
        the nearest emergency room.
      </p>
    </footer>
  );
}
