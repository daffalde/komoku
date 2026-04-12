import Link from "next/link";
import "./Urlcheck.css";

export default function Urlcheck({
  HasilConfidence,
  HasilResult,
  HasilDesc,
  HasilUrl,
  code,
}: any) {
  return (
    <div className="urlcheck">
      <div
        className={`urlcheck-left ${code !== 100 ? "urlcheck-left-red" : "urlcheck-left-green"}`}
      >
        <img
          height={30}
          src={code !== 100 ? "/warning.png" : "/check.png"}
          alt="warning logo"
        />
        <span>
          <h4>{HasilResult}</h4>
          <p className="p-secondary">{HasilDesc}</p>
          <Link
            style={{
              pointerEvents: code !== 100 ? "none" : "auto",
              textDecoration: code !== 100 ? "line-through" : "underline",
            }}
            href={
              HasilUrl.startsWith("http") ? HasilUrl : `https://${HasilUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="url-link"
          >
            {HasilUrl}
          </Link>
        </span>
      </div>
      {code === 200 || code === 201 ? null : (
        <>
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
        </>
      )}
    </div>
  );
}
