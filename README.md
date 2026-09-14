# Canva Export Menu

### 1. What the project is

This is a pixel-perfect, highly interactive front-end replica of the Canva export modal. Built from scratch using vanilla JavaScript, HTML5, and CSS3, it demonstrates modern UI development, state management, and custom styling (such as gradients and custom radio toggles) without relying on external libraries. It perfectly simulates the real-world user flow of exporting a document, complete with validation, asynchronous loading states, and network connectivity checks.

*Live Deployment: The project is live and can be viewed here: https://carmy4.github.io/canva-export-menu/*

### 2. How to run it locally

This project is a static front-end application with no build process. To run it on a fresh machine, follow these exact steps:
1. Clone the repository to your local machine: `git clone https://github.com/Carmy4/canva-export-menu.git`
2. Navigate into the project directory: `cd canva-export-menu`
3. Open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Safari). You can do this by double-clicking the file in your file explorer, or by dragging and dropping it into a browser tab. *(Note: There are no npm install, package management, or build commands required).*

### 3. How to use it

**The shortest path to seeing the app work:**
1. Open the application; notice the "All pages" radio option is selected by default (mirroring actual Canva behavior).
2. Click the purple "Download" button.
3. Watch the interactive states: the button disables, its text changes, and a loading message appears for 2 seconds before resolving into a green success message.

**Testing the application states (Validation & Network):**
*   **Validation Error State:** Open `index.html` in your code editor, temporarily delete the `checked` attribute from the `<input type="radio" id="page-all">`, save, and refresh the browser. Click "Download" without selecting anything to trigger the red validation error message.
*   **Offline/Network Error State:** Turn off your computer's Wi-Fi or disconnect from the internet, then click "Download". The JavaScript `navigator.onLine` check will intercept the action and display a network error message.
*   **Loading & Success States:** Triggered automatically upon a valid submission, simulating a 2-second file generation delay using `setTimeout`.

### 4. Environment Variables

This project requires NO environment variables. There is no `.env.example` file to copy, and no API keys, secrets, or backend configurations are needed. Everything runs locally in the browser.

### 5. Known Limits (What it does NOT do)

*   **No Actual File Generation:** The application simulates the process of exporting a document. It does not compile, render, or download an actual PDF, PNG, or JPG file to the user's hard drive.
*   **No Backend Connection:** The loading state is a controlled frontend simulation (using `setTimeout`). It does not send POST requests or payload data to a server.
*   **No Persistent State:** Page selections and success messages are transient. Refreshing the browser resets the modal to its default state.

### 6. Technical Decisions (Defensive Programming vs. Authentic UX)

*   **The Challenge:** Balancing an authentic user experience (where options are pre-selected to save user clicks) with robust application security (preventing crashes if selections are somehow cleared).
*   **Alternative Considered:** Removing the default `checked` attribute in HTML to force the user to make a manual choice, guaranteeing the validation logic is tested every time. This was rejected because it breaks the seamless 1:1 Canva UX where "All pages" is checked by default for convenience.
*   **The Accepted Decision:** Kept the `checked` attribute directly in the HTML markup to mirror the real product. However, I still implemented a strict JavaScript validation check (`if (!isPageSelected)`) and a network check *before* allowing the download logic to run.
*   **The Benefit:** The user gets the intended fluid experience (fewer clicks), but the application is protected by "defensive programming". If a future developer modifies the HTML and removes the `checked` attribute, or if a browser bug clears the form, the application handles it gracefully with a clear error message instead of silently failing.

### 7. Accessibility & UI Considerations

*   **Custom Radio Buttons:** The native HTML radio inputs are visually hidden to allow for modern UI styling (custom circles with purple borders), but they remain semantically present in the DOM so that screen readers and keyboard navigation still function correctly.
*   **Dynamic State Messaging:** The single `#status-message` element is dynamically updated with specific CSS utility classes (`.error-state`, `.success-state`, `.loading-state`) to ensure contrast and visual hierarchy change drastically depending on the application's context.

### 8. Comparison with the Original (One Improvement)

While this replica omits the actual backend file generation, it introduces **one specific improvement** over the original Canva modal: **Immediate Offline Interception**. 
In the original application, losing network connection during the export process can sometimes result in a prolonged loading state or a generic system toast notification. This version improves the user experience by implementing a proactive `navigator.onLine` check. It instantly intercepts the user's click if they are offline and renders a highly visible, context-specific error message directly inside the modal UI, preventing any asynchronous tasks from even attempting to start.# canva-export-menu