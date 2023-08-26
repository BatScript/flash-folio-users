import styles from "./input.module.scss";

const Input = ({
  variant = "bordered",
  className = "",
  placeHolder = "",
  onChange,
  value,
  type,
  errorMessage="Incorrect Entry!",
  required=false,
  name=""
}) => {
  // Initialisations 👇
  // ----------------
  // Functions 👇
  // ----------------
  // Sub Components 👇
  // ----------------
  // Final Return Statement 👇
  switch (variant) {
    case "bordered":
      return (
        <input
          required={required}
          type={type}
          className={`${className} tw-w-full ${styles.bordered}`}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => onChange(e)}
          name={name}
        />
      );
    case "error":
      return (
        <>
          <input
          name={name}
            type={type}
            className={`${className} tw-w-full ${styles.error}`}
            placeholder={placeHolder}
            value={value}
            onChange={(e) => onChange(e)}
          />
          <p className={`${styles.errroHelper}`}>{errorMessage}</p>
        </>
      );
  }
  // ----------------
};
export default Input;
