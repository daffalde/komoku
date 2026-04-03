import Link from "next/link";
import "./Urlcheck.css";

export default function Urlcheck({
  HasilConfidence,
  HasilResult,
  HasilDesc,
  HasilUrl,
}: any) {
  return (
    <div className="urlcheck">
      <div
        className={`urlcheck-left ${HasilResult == "Suspicious Link" ? "urlcheck-left-red" : "urlcheck-left-green"}`}
      >
        <img
          height={30}
          src={HasilResult == "Suspicious Link" ? "/warning.png" : "/check.png"}
          alt="warning logo"
        />
        <span>
          <h4>{HasilResult}</h4>
          <p className="p-secondary">{HasilDesc}</p>
          <Link
            style={{
              pointerEvents: HasilResult == "Suspicious Link" ? "none" : "auto",
              textDecoration:
                HasilResult == "Suspicious Link" ? "line-through" : "underline",
            }}
            href={
              HasilUrl.startsWith("http") ? HasilUrl : `https://${HasilUrl}`
            }
            target="_blank"
            rel="noopener noreferrer" // Wajib untuk keamanan saat buka tab baru
            className="url-link"
          >
            {HasilUrl}
          </Link>
        </span>
      </div>
      <div className="progress-confid">
        <div
          style={{
            width: `${HasilConfidence}%`,
            backgroundColor:
              HasilResult == "Suspicious Link" ? "#b80000" : "#43B800",
          }}
          className="prohress-confid-in"
        ></div>
      </div>
      <p style={{ fontWeight: "700" }}>Confidence : {HasilConfidence}%</p>
    </div>
  );
}
