import Link from "next/link";
import styles from "./page.module.css";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <div className={styles.page}>
      <Box sx={{ padding: 8 }}>
        <Box sx={{ padding: 1 }}>
          <Link href={"/register"}>
            React Hook Form Controller with MUI TextField Example
          </Link>
        </Box>
        <Box sx={{ padding: 1 }}>
          <Link href={"/controller"}>
            React Hook Form Register with MUI TextField Example
          </Link>
        </Box>
        <Box sx={{ padding: 1 }}>
          <Link href={"/web-component"}>
            React Hook Form Register with MUI TextField + Web Component Example{" "}
          </Link>
        </Box>
      </Box>
    </div>
  );
}
