import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState(new Set());

  const timeSlots = [
    "2025-08-20T18:00",
    "2025-08-20T19:00",
    "2025-08-20T20:00"
  ];

  const toggleTime = (t) => {
    const newSet = new Set(selected);
    if (newSet.has(t)) newSet.delete(t);
    else newSet.add(t);
    setSelected(newSet);
  };

  const submit = async () => {
    await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId: "abcd1234",
        userName: "太郎",
        times: [...selected]
      })
    });
    alert("送信しました");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>日程選択（日本語版When2meet簡易）</h1>
      {timeSlots.map((t) => (
        <div
          key={t}
          style={{
            padding: 8,
            margin: 4,
            background: selected.has(t) ? "lightgreen" : "lightgray",
            cursor: "pointer"
          }}
          onClick={() => toggleTime(t)}
        >
          {t}
        </div>
      ))}
      <button onClick={submit}>送信</button>
    </div>
  );
}
