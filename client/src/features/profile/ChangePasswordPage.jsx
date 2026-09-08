import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function getPasswordStrength(password) {
  if (!password) {
    return {
      label: "Enter a new password",
      score: 0,
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = {
    1: "Very Weak",
    2: "Weak",
    3: "Fair",
    4: "Strong",
    5: "Very Strong",
  };

  return {
    label: labels[score] || "Very Weak",
    score,
  };
}

function PasswordInput({
  label,
  name,
  value,
  onChange,
  visible,
  onToggle,
  placeholder,
  error,
}) {
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>

      <div className={`password-input-wrapper ${error ? "has-error" : ""}`}>
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={
            name === "currentPassword" ? "current-password" : "new-password"
          }
        />

        <button
          type="button"
          className="password-visibility-button"
          onClick={onToggle}
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
        >
          {visible ? "◉" : "◌"}
        </button>
      </div>

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [visibility, setVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(form.newPassword),
    [form.newPassword],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
    setSuccess("");
  };

  const toggleVisibility = (field) => {
    setVisibility((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.currentPassword.trim()) {
      nextErrors.currentPassword = "Current password is required.";
    }

    if (!form.newPassword) {
      nextErrors.newPassword = "New password is required.";
    } else if (form.newPassword.length < 8) {
      nextErrors.newPassword = "Password must contain at least 8 characters.";
    } else if (!/[A-Z]/.test(form.newPassword)) {
      nextErrors.newPassword =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(form.newPassword)) {
      nextErrors.newPassword =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(form.newPassword)) {
      nextErrors.newPassword = "Password must contain at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(form.newPassword)) {
      nextErrors.newPassword =
        "Password must contain at least one special character.";
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your new password.";
    } else if (form.newPassword !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (
      form.currentPassword &&
      form.newPassword &&
      form.currentPassword === form.newPassword
    ) {
      nextErrors.newPassword =
        "New password must be different from your current password.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");
    setSuccess("");

    // Client-side validation
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/v1/profile/password", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword: form.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error?.message || "Unable to change password.");
      }

      setSuccess("Password changed successfully.");

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-section change-password-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">ACCOUNT SECURITY</span>

          <h1>Change Password</h1>

          <p>Update your password to keep your MERN SKILLS account secure.</p>
        </div>

        <button
          type="button"
          className="button button-secondary"
          onClick={() => navigate("/settings")}
        >
          ← Back to Settings
        </button>
      </div>

      <div className="change-password-layout">
        <div className="change-password-card">
          <div className="security-icon">🔐</div>

          <div className="card-heading">
            <span className="eyebrow">SECURITY</span>
            <h2>Update your password</h2>
            <p>Choose a strong password that you don't use anywhere else.</p>
          </div>

          {serverError && (
            <div className="form-alert form-alert-error">{serverError}</div>
          )}

          {success && (
            <div className="form-alert form-alert-success">{success}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <PasswordInput
              label="Current Password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              visible={visibility.currentPassword}
              onToggle={() => toggleVisibility("currentPassword")}
              placeholder="Enter your current password"
              error={errors.currentPassword}
            />

            <PasswordInput
              label="New Password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              visible={visibility.newPassword}
              onToggle={() => toggleVisibility("newPassword")}
              placeholder="Enter your new password"
              error={errors.newPassword}
            />

            {form.newPassword && (
              <div className="password-strength">
                <div className="password-strength-header">
                  <span>Password strength</span>
                  <strong>{passwordStrength.label}</strong>
                </div>

                <div className="strength-bars">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <span
                      key={bar}
                      className={bar <= passwordStrength.score ? "filled" : ""}
                    />
                  ))}
                </div>
              </div>
            )}

            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              visible={visibility.confirmPassword}
              onToggle={() => toggleVisibility("confirmPassword")}
              placeholder="Confirm your new password"
              error={errors.confirmPassword}
            />

            <div className="password-requirements">
              <div className="requirements-title">Password requirements</div>

              <div
                className={
                  form.newPassword.length >= 8
                    ? "requirement valid"
                    : "requirement"
                }
              >
                <span>✓</span>
                At least 8 characters
              </div>

              <div
                className={
                  /[A-Z]/.test(form.newPassword)
                    ? "requirement valid"
                    : "requirement"
                }
              >
                <span>✓</span>
                One uppercase letter
              </div>

              <div
                className={
                  /[a-z]/.test(form.newPassword)
                    ? "requirement valid"
                    : "requirement"
                }
              >
                <span>✓</span>
                One lowercase letter
              </div>

              <div
                className={
                  /[0-9]/.test(form.newPassword)
                    ? "requirement valid"
                    : "requirement"
                }
              >
                <span>✓</span>
                One number
              </div>

              <div
                className={
                  /[^A-Za-z0-9]/.test(form.newPassword)
                    ? "requirement valid"
                    : "requirement"
                }
              >
                <span>✓</span>
                One special character
              </div>
            </div>

            <div className="change-password-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => navigate("/settings")}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="button button-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>

        <aside className="security-info-card">
          <span className="eyebrow">SECURITY TIP</span>

          <h3>Keep your account protected.</h3>

          <p>
            Use a unique password for MERN SKILLS and avoid sharing it with
            anyone.
          </p>

          <div className="security-divider" />

          <div className="security-item">
            <span>01</span>
            <div>
              <strong>Use a unique password</strong>
              <p>Don't reuse your MERN SKILLS password on other websites.</p>
            </div>
          </div>

          <div className="security-item">
            <span>02</span>
            <div>
              <strong>Make it difficult to guess</strong>
              <p>
                Combine uppercase, lowercase, numbers and special characters.
              </p>
            </div>
          </div>

          <div className="security-item">
            <span>03</span>
            <div>
              <strong>Never share your password</strong>
              <p>MERN SKILLS support will never ask for your password.</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
