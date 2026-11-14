WONDERLAND DREAM — TEST VERSION (New Story)
==========================================

WHAT IS READY
- wonderland/index.html — standalone sales landing page, English text and brand palette.
- wonderland/rounds/rabbit-hole/index.html — first hidden quest page, mobile-friendly.
- wonderland/game.js — checks the secret word QUEEN, displays success, remembers completion in this browser.
- wonderland/styles.css — standalone styles. The old website files remain unchanged.

IMPORTANT
- There is NO payment integration and NO buyer-specific access control.
- The Rabbit Hole page is omitted from all public navigation, with noindex/nofollow set. Anyone with its direct URL can still open it. This is not protection.
- The 5 correct silhouettes / 10 physical cards are not included: this page is the video + digital answer step, not a replacement for the physical kit.
- The landing artwork is a CSS placeholder, not the user's previously approved image design. Swap in approved images later.
- No video was provided. Place video at wonderland/assets/videos/rabbit-hole.mp4. It will show when it loads.
- The buttons on the landing only scroll to sections. Prices show the planned formats; no fictional checkout links.

LOCAL TESTING (do not modify live website)
1. Unzip this package.
2. In VS Code, open the included folder "website - Copy (2)" (or copy the wonderland folder into a COPY of your actual project).
3. In a browser, open wonderland/index.html to see landing page.
4. Open wonderland/rounds/rabbit-hole/index.html to see the hidden round page.
5. Input 'QUEEN' to test the success message. Test wrong words and 'Play this round again'.
6. Check desktop and phone. For live testing on a phone, publish only to a test environment first.

DEPLOYMENT AFTER TESTING
- Upload the wonderland/ folder without touching the existing home page.
- Expected URL if deployed at site root and directory index routing is supported:
  https://newstoryevent.com/wonderland/
- Reliable direct round URL (confirm it works on actual host BEFORE generating/printing QR):
  https://newstoryevent.com/wonderland/rounds/rabbit-hole/index.html
- Need host-specific configuration for clean URLs, if desired.
- After the final deployment address is confirmed, generate the QR for the printed Rabbit Hole quest card.

NEXT STEPS
- Replace landing placeholder visuals with the approved design.
- Add final Rabbit Hole video and card assets.
- Check 6-round content before creating the other 5 rounds and finale.
- Do not publish as a paid product until checkout and delivery are configured.
