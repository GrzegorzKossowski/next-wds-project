import { auth } from "@/auth";
import ThemeSwitch from "./_components/ThemeSwitch";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4 m-5">
        <ThemeSwitch />
        <div>{session && JSON.stringify(session, null, 2)}</div>
      </div>
      <div>
        {session ? (
          <LogoutButton />
        ) : (
          <Link href={"/sign-in"} className="border p-1 bg-zinc-500">
            Login
          </Link>
        )}
        {session && <Link href={"/dashboard"}>Private dashboard</Link>}
        <Link href={"/parallels"} className="bg-zinc-500/30 p-2 m-2">
          Parallels
        </Link>
        <Link href={"/infinite"} className="bg-zinc-500/30 p-2 m-2">
          Infinite Scroll
        </Link>
      </div>
      <div>
        <iframe
          style={{
            border: "none",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
          width="100%"
          height="750px"
          // allowTransparency={true}
          src="https://www.interankiety.pl/f/pOrX2ve9?embeded=1"
        ></iframe>{" "}
        <div
          style={{
            fontFamily: "Sans-Serif",
            fontSize: "13px",
            color: "#999999",
            opacity: 0.7,
            paddingTop: "6px",
          }}
        >
          {" "}
          Stworzone w serwisie{" "}
          <a
            href="https://www.interankiety.pl"
            style={{ color: "#999999" }}
            target="_blank"
          >
            interankiety
          </a>
        </div>
      </div>
      <div>
        <a
          href="https://www.interankiety.pl/f/pOrX2ve9"
          style={{
            display: "inline-block",
            textDecoration: "none",
            backgroundColor: "#D0021B",
            color: "white",
            cursor: "pointer",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "21px",
            lineHeight: "52.5px",
            textAlign: "center",
            margin: "0 0 20px 0",
            padding: "0px 35px",
            borderRadius: "52.5px",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
          target="_blank"
        >
          Zostań testerem
        </a>
      </div>
      <div>
        <a
          href="https://www.interankiety.pl/f/pOrX2ve9"
          style={{
            display: "inline-block",
            textDecoration: "none",
            backgroundColor: "#D0021B",
            color: "white",
            cursor: "pointer",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "21px",
            lineHeight: "52.5px",
            textAlign: "center",
            margin: "0 0 20px 0",
            padding: "0px 35px",
            borderRadius: "4px",
            maxWidth: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontWeight: "bold",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
          target="_blank"
        >
          Zostań testerem
        </a>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <!-- Start of interankiety code -->
<script>
(function (w,d,s,o,f,js,fjs) {
w['Rounded-Widget']=o;w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
}(window, document, 'script', 'roundedw', 'https://www.interankiety.pl/widget/widget.js'));
roundedw('type', 'widget');
roundedw('configuration', { putItOnLeft: false, backgroundColor: '#D0021B', iconColor: '#FFFFFF', showLabelOnHover: false, showLabel: false, icon: 'record', label: 'Ankieta', activeWidget: false, id: 'pOrX2ve9', app: 'interankiety'});
</script>
<!-- End of code -->
`,
        }}
      ></div>
    </div>
  );
}
