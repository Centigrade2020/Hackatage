import "./Footer.css";

function Footer() {
  return (
    <div className="Footer">
      <p>
        <span
          onClick={() => {
            window.open("https://centigrade.ml", "_blank");
          }}
        >
          Centigrade{" "}
        </span>
        | Hackatoge
      </p>
    </div>
  );
}

export default Footer;
