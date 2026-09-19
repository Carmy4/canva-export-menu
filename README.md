# Canva Export Menu

## 1. What the project is

This is a pixel-perfect, highly interactive front-end replica of the Canva export modal. Built from scratch using vanilla JavaScript, HTML5, and CSS3, it demonstrates modern UI development, state management, and custom styling (such as gradients and custom radio toggles) without relying on external libraries. It perfectly simulates the real-world user flow of exporting a document, complete with validation, asynchronous loading states, and network connectivity checks.
**Live Deployment:** The project is live and can be viewed here: https://carmy4.github.io/canva-export-menu/

## 2. How to run it locally

This project is a static front-end application with no build process. To run it on a fresh machine, follow these exact steps:
1. Clone the repository to your local machine: `git clone https://github.com/Carmy4/canva-export-menu.git`
2. Navigate into the project directory: `cd canva-export-menu`
3. Open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Safari). You can do this by double-clicking the file in your file explorer, or by dragging and dropping it into a browser tab. (Note: There are no npm install, package management, or build commands required).

## 3. How to use it

The shortest path to seeing the app work:
1. Open the application; notice the "All pages" radio option is selected by default (mirroring actual Canva behavior).
2. Click the purple "Download" button.
3. Watch the interactive states: the button disables, its text changes, and a loading message appears for 2 seconds before resolving into a green success message.

**Testing the application states (Validation & Network):**
*   **Validation Error State:** Open `index.html` in your code editor, temporarily delete the `checked` attribute from the `<input type="radio" id="page-all">`, save, and refresh the browser. Click "Download" without selecting anything to trigger the red validation error message.
*   **Offline/Network Error State:** Turn off your computer's Wi-Fi or disconnect from the internet, then click "Download". The JavaScript `navigator.onLine` check will intercept the action and display a network error message.
*   **Loading & Success States:** Triggered automatically upon a valid submission, simulating a 2-second file generation delay using `setTimeout`.

## 4. Environment Variables

This project requires NO environment variables. There is no `.env.example` file to copy, and no API keys, secrets, or backend configurations are needed. Everything runs locally in the browser.

## 5. Known Limits (What it does NOT do)

*   **No Actual File Generation:** The application simulates the process of exporting a document. It does not compile, render, or download an actual PDF, PNG, or JPG file to the user's hard drive.
*   **No Backend Connection:** The loading state is a controlled frontend simulation (using `setTimeout`). It does not send POST requests or payload data to a server.
*   **No Persistent State:** Page selections and success messages are transient. Refreshing the browser resets the modal to its default state.

---

## 6. Architectural Decision Record

Below are the three decisions that would be most expensive to reverse, outlining what was considered, why the choice was made, and the accepted costs.

### Decision 1: Using Strict Vanilla Technologies (No Frameworks)
*   **What was decided:** To build the modal using purely HTML5, CSS3, and Vanilla JavaScript, completely avoiding frameworks like React or CSS libraries like Tailwind.
*   **Alternatives considered:** Using React for state management (loading/success/error) and Tailwind for rapid UI styling.
*   **Why this one:** For a single, isolated UI component, introducing a Node.js environment, a package manager, and a build step is overkill. Vanilla JS ensures the fastest possible Time To Interactive (TTI) and zero setup friction for anyone reviewing the code.
*   **What it costs you:** Manually querying the DOM (`document.getElementById`) and imperatively syncing the UI state with the logic requires more boilerplate code. Reversing this decision later to scale the app with complex dynamic tabs would require a complete rewrite of the state logic.

### Decision 2: Proactive Offline Checking via `navigator.onLine`
*   **What was decided:** To wrap the download action in a proactive `if (!navigator.onLine)` check to immediately block the action if the user has no network connection.
*   **Alternatives considered:** Letting the simulated "fetch" request fail naturally and relying purely on a `.catch()` block or a timeout to handle the error state.
*   **Why this one:** UX optimization. It provides instantaneous feedback to the user without making them wait for a network timeout, establishing a highly responsive interface that improves upon the original Canva modal.
*   **What it costs you:** The `navigator.onLine` API is notoriously unreliable. It only verifies if the device is connected to a local network interface (like a router), not if that router actually has internet access. The cost is accepting a potential false positive where the app thinks it is online, bypasses the check, and would theoretically still fail later.

### Decision 3: Pure CSS Toggles via Pseudo-elements (The "Awkward" Decision)
*   **What was decided:** To create the Canva-style toggle switches by applying `appearance: none` to native HTML `<input type="checkbox">` elements and styling them entirely using CSS `::before` pseudo-elements for the sliding circle.
*   **Alternatives considered:** Hiding the native checkbox visually and using a sibling `<span>` or external SVG icons to handle the visual representation of the toggle (a common "hack").
*   **Why this one:** It keeps the HTML structure extremely clean and semantic, reducing the number of DOM nodes. It relies on the browser's native accessibility for the checkbox rather than having to manually wire `aria-checked` attributes to a custom `div`.
*   **What it costs you (Why it proved awkward):** This decision has proved **awkward** to maintain across different browsers. Controlling the transform animations and positioning strictly within the rigid constraints of a native input's pseudo-element became highly complex, particularly when managing custom focus rings (`:focus-visible`). Reversing this to build a scalable component library would require changing both the HTML structure and all the associated CSS, making it a highly expensive architectural pivot.

## 7. Accessibility & UI Considerations

*   **Custom Radio Buttons:** The native HTML radio inputs are visually hidden to allow for modern UI styling, but they remain semantically present in the DOM so that screen readers and keyboard navigation still function correctly.
*   **Dynamic State Messaging:** The single `#status-message` element is dynamically updated with specific CSS utility classes (`.error-state`, `.success-state`, `.loading-state`) to ensure contrast and visual hierarchy change drastically depending on the application's context.
