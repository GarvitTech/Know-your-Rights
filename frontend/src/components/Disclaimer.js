import React from "react";

export default function Disclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
      <span className="text-amber-500 text-xl flex-shrink-0">⚠️</span>
      <p className="text-amber-800 text-sm">
        <strong>Legal Disclaimer:</strong> This application provides educational information only and does{" "}
        <strong>not</strong> replace professional legal advice. For specific legal matters, please consult a
        qualified lawyer in your jurisdiction.
      </p>
    </div>
  );
}
