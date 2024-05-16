// Modal-react.jsx
// description: The component was intended to generate Modal using React and React's createPortal() api.
// obstacle: Astro or Vite has a problem to render nested component from UI integration like react.

import { useState } from "react";
import { createPortal } from "react-dom";

function ModalContent({ onClose }) {
  return (
    <div className="modal">
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Show modal using a portal
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
}
