export default function Footer() {
  return (
    <footer>
      <div style={{display:"flex",justifyContent:"space-between",gap:"18px",flexWrap:"wrap"}}>
        <span>© {new Date().getFullYear()} MERN SKILLS</span>
        <span>Secure workspace · Context + Redux · MongoDB</span>
      </div>
    </footer>
  );
}
