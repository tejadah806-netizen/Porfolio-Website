import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MotionProvider, Reveal, ScrollProgress } from "@/components/motion";
import { Footer } from "@/components/Sections";
import { profile } from "@/data/site";

import baselineHttp from "./screenshots/01-baseline-http.png";
import sshConf from "./screenshots/02-ssh-hardening-conf.png";
import sshDenied from "./screenshots/03-ssh-password-denied.png";
import ufwStatus from "./screenshots/04-ufw-status-verbose.png";
import ufwBlock from "./screenshots/05-ufw-block-log.png";
import nginxCurl from "./screenshots/06-nginx-test-curl.png";
import httpsChrome from "./screenshots/07-https-chrome.png";
import f2bBan from "./screenshots/08-fail2ban-ban-ufw.png";
import f2bLog from "./screenshots/09-fail2ban-log.png";
import ssTulpn from "./screenshots/10-ss-tulpn.png";
import rebootChecks from "./screenshots/11-post-reboot-checks.png";

export const metadata: Metadata = {
  title: "Hardened Linux Web Server — Heriberto Tejada Guzmán",
  description:
    "Home lab write-up: an Ubuntu web server hardened with SSH keys, a default-deny firewall, HTTPS and fail2ban, with every control tested by attacking it.",
};

/* ── small building blocks ── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-caliente">
      {children}
    </p>
  );
}

function Block({
  id,
  label,
  title,
  lead,
  children,
}: {
  id: string;
  label: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-slate-line py-16 sm:py-20">
      <Reveal>
        <Label>{label}</Label>
        <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-text">{lead}</p>
      </Reveal>
      <div className="mt-10 space-y-8">{children}</div>
    </section>
  );
}

function Threat({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-caliente/30 bg-caliente/[0.06] p-5">
      <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-caliente">
        Threat addressed
      </p>
      <p className="leading-relaxed text-slate-text">{children}</p>
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-miami">{children}</p>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-line bg-midnight-2 p-5 font-mono text-[13px] leading-relaxed text-slate-text">
      <code>{children}</code>
    </pre>
  );
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-midnight-2 px-1.5 py-0.5 font-mono text-[0.9em] text-miami-soft">
      {children}
    </code>
  );
}

function Shot({
  src,
  caption,
  narrow = false,
}: {
  src: StaticImageData;
  caption: string;
  narrow?: boolean;
}) {
  return (
    <figure className={narrow ? "max-w-xl" : ""}>
      <a
        href={src.src}
        target="_blank"
        rel="noreferrer"
        title="Open full size"
        className="block overflow-hidden rounded-xl border border-slate-line bg-black transition-colors hover:border-miami/60"
      >
        <Image src={src} alt={caption} className="h-auto w-full" sizes="(min-width: 1024px) 896px, 100vw" />
      </a>
      <figcaption className="mt-3 text-sm text-slate-mute">
        {caption} <span className="text-slate-mute/70">Click to enlarge.</span>
      </figcaption>
    </figure>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-slate-text">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-miami" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-line">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="bg-midnight-2">
          <tr>
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-slate-mute"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-line">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 align-top leading-relaxed ${j === 0 ? "font-medium text-white" : "text-slate-text"}`}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const stats = [
  { value: "3", label: "public ports: SSH, HTTP and HTTPS" },
  { value: "0.4 s", label: "from detecting my brute-force attack to banning it" },
  { value: "5 / 5", label: "hardening controls tested by attacking them" },
];

const tags = ["Linux", "Ubuntu Server 26.04", "SSH", "UFW", "fail2ban", "Nginx", "TLS"];

/* ── page ── */

export default function LinuxHardening() {
  return (
    <MotionProvider>
      <ScrollProgress />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-line/80 bg-midnight/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-miami/40 bg-miami/10 font-mono text-sm font-bold text-miami transition-all group-hover:rotate-6 group-hover:bg-miami group-hover:text-midnight">
              {profile.initials}
            </span>
            <span className="hidden font-semibold tracking-tight text-white sm:block">
              {profile.shortName}
              <span className="text-caliente">.</span>
            </span>
          </Link>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-line px-4 py-2 text-sm text-white transition-all hover:border-miami hover:bg-miami hover:text-midnight"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-5 pt-32 sm:px-8 sm:pt-40">
        {/* hero */}
        <Reveal>
          <Label>Project · Nov 2026 · Home lab</Label>
          <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-white sm:text-7xl">
            Hardened Linux Web Server
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-slate-text">
            I built an Ubuntu web server from scratch in a virtual machine and hardened it with five
            layered controls. Then I attacked my own server to prove each one works.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-midnight-2 px-2.5 py-1 font-mono text-xs text-slate-text"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.value} className="rounded-2xl border border-slate-line bg-surface/70 p-6">
                <p className="text-4xl font-extrabold tracking-tight text-miami">{s.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-mute">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16">
          {/* environment */}
          <Block
            id="lab"
            label="The lab"
            title="One laptop, fully isolated"
            lead="The whole lab runs on my MacBook, so the server is separate from my everyday system and can be rolled back from snapshots at any time."
          >
            <Table
              head={["Component", "Details"]}
              rows={[
                ["Host", "MacBook Pro 13-inch, Apple M2, 8 GB RAM"],
                ["Hypervisor", "UTM (QEMU engine, hardware virtualization)"],
                ["Guest OS", "Ubuntu Server 26.04.1 LTS, ARM64, no desktop"],
                ["VM resources", "2 vCPU, 2 GB RAM, 20 GB disk (LVM)"],
                ["Network", "UTM shared network; server at 192.168.64.4, host at 192.168.64.1"],
                ["Access", "SSH from macOS Terminal; the UTM console as a backup way in"],
                ["Recovery", "A VM snapshot after each major stage"],
              ]}
            />
          </Block>

          {/* baseline */}
          <Block
            id="baseline"
            label="Starting point"
            title="A patched server running Nginx"
            lead="Before hardening, I built a minimal, fully updated server: Ubuntu Server with only OpenSSH added, the root volume resized from 10 GB to 17.3 GB for logs, all 46 pending updates applied, and Nginx installed."
          >
            <p className="leading-relaxed text-slate-text">
              At this point the site was served over plain HTTP, Chrome flagged it as Not Secure, and
              SSH still accepted passwords.
            </p>
            <Shot src={baselineHttp} caption="Baseline: the default Nginx page over plain HTTP, marked Not Secure." />
          </Block>

          {/* step 1 */}
          <Block
            id="ssh"
            label="Step 01"
            title="SSH key-only login"
            lead="The server now accepts SSH logins only from a holder of my private key, which makes password guessing useless."
          >
            <Threat>
              Password brute-forcing and credential stuffing against SSH, the most common attack on
              internet-facing Linux servers.
            </Threat>
            <div>
              <Sub>What I did</Sub>
              <Bullets
                items={[
                  <>Generated an Ed25519 key pair on my Mac, protected by a passphrase, and installed the public key with <C>ssh-copy-id</C>.</>,
                  <>Wrote a drop-in config, <C>/etc/ssh/sshd_config.d/00-hardening.conf</C>, so my rules override the defaults and survive package updates.</>,
                  <>Validated it with <C>sudo sshd -t</C> before restarting SSH, keeping a session open as a fallback.</>,
                ]}
              />
            </div>
            <Code>{`PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no`}</Code>
            <Shot src={sshConf} caption="The hardening file, checked with sshd -t before applying it." />
            <div>
              <Sub>Proof</Sub>
              <p className="leading-relaxed text-slate-text">
                Posing as an attacker without a key, the server returned <C>Permission denied (publickey)</C> and
                never offered a password prompt. My normal key login still worked.
              </p>
            </div>
            <Shot src={sshDenied} caption="Login without a key is refused; login with my key asks for the key passphrase." />
          </Block>

          {/* step 2 */}
          <Block
            id="firewall"
            label="Step 02"
            title="Default-deny firewall"
            lead="All inbound traffic is now blocked except SSH (22), HTTP (80) and HTTPS (443), and every blocked attempt is logged."
          >
            <Threat>
              Services that are running but not meant to be public, and reconnaissance through port scanning.
            </Threat>
            <div>
              <Sub>What I did</Sub>
              <p className="mb-4 leading-relaxed text-slate-text">
                I allowed SSH before turning the firewall on, so I couldn&apos;t lock myself out, and
                commented each rule so its purpose stays clear.
              </p>
              <Code>{`sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp comment 'SSH'
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'
sudo ufw enable
sudo ufw logging on`}</Code>
            </div>
            <Shot src={ufwStatus} caption="Default deny incoming, logging on, and only three ports allowed." />
            <div>
              <Sub>Proof</Sub>
              <p className="leading-relaxed text-slate-text">
                I started a test service on port 8080 and tried to reach it from my Mac. The request timed out,
                the service never saw it, and the kernel logged every dropped attempt with the source, destination
                and port. Five entries one second apart show my Mac retrying the connection. The same pattern
                across many ports is what a port scan looks like.
              </p>
            </div>
            <Shot src={ufwBlock} caption="UFW BLOCK log entries: SRC=192.168.64.1 (my Mac) trying DPT=8080." />
          </Block>

          {/* step 3 */}
          <Block
            id="https"
            label="Step 03"
            title="HTTPS with modern TLS"
            lead="All web traffic is now encrypted, plain HTTP redirects to HTTPS, and the server no longer reveals its Nginx version."
          >
            <Threat>
              Eavesdropping and tampering on the network, and attackers matching a disclosed software version
              to known vulnerabilities.
            </Threat>
            <div>
              <Sub>What I did</Sub>
              <Bullets
                items={[
                  <>Created a 2048-bit RSA key and a self-signed certificate, with the private key in root-only <C>/etc/ssl/private/</C>.</>,
                  <>Wrote a new Nginx site: port 80 returns a <C>301</C> redirect to HTTPS, and port 443 serves the site with <C>ssl_protocols TLSv1.2 TLSv1.3</C> only.</>,
                  <>Turned on <C>server_tokens off</C> to hide the version number.</>,
                  <>Validated with <C>nginx -t</C>, then applied with <C>systemctl reload nginx</C> so no connections dropped.</>,
                ]}
              />
            </div>
            <Shot src={nginxCurl} caption="Config test passes; the HTTPS response is 200 OK with Server: nginx and no version." />
            <Shot src={httpsChrome} caption="The site served over HTTPS." />
            <p className="leading-relaxed text-slate-mute">
              The certificate is self-signed because the lab has no public domain, so browsers show a trust
              warning even though the traffic is encrypted. On a public server I would use Let&apos;s Encrypt and
              add HSTS.
            </p>
          </Block>

          {/* step 4 */}
          <Block
            id="fail2ban"
            label="Step 04"
            title="Automatic banning with fail2ban"
            lead="fail2ban watches the SSH logs and blocks any IP that fails 3 times in 10 minutes. In my test it banned the attacker about 0.4 seconds after the first detection."
          >
            <Threat>
              Bots that hammer SSH with username and password guesses all day, probing for weak accounts.
            </Threat>
            <div>
              <Sub>What I did</Sub>
              <p className="mb-4 leading-relaxed text-slate-text">
                A local override file, <C>/etc/fail2ban/jail.local</C>, that package updates never replace.
                Bans become visible UFW rules, and aggressive mode also catches clients that give up instantly,
                which matters because my server rejects passwords before any guess is made.
              </p>
              <Code>{`[DEFAULT]
bantime   = 10m
findtime  = 10m
maxretry  = 3
banaction = ufw
backend   = systemd

[sshd]
enabled = true
mode    = aggressive`}</Code>
            </div>
            <div>
              <Sub>The attack</Sub>
              <p className="mb-4 leading-relaxed text-slate-text">
                From my Mac, a bot-style loop tried five common usernames without stopping for prompts:
              </p>
              <Code>{`for user in admin test guest oracle hacker; do
  ssh -o BatchMode=yes -o ConnectTimeout=5 $user@192.168.64.4
done`}</Code>
            </div>
            <div>
              <Sub>Proof</Sub>
              <Table
                head={["Time (UTC)", "Event", "Where"]}
                rows={[
                  ["16:58:38.316", "First failed attempt detected (Found 192.168.64.1)", "fail2ban.log"],
                  ["16:58:38.688", "Attacker banned (Ban 192.168.64.1)", "fail2ban.log"],
                  ["16:58:38", "Firewall rule added: REJECT 192.168.64.1, by Fail2Ban after 3 attempts", "ufw status"],
                ]}
              />
            </div>
            <Shot src={f2bBan} caption="The jail shows my Mac banned, and fail2ban's REJECT rule sits at the top of the firewall." />
            <Shot src={f2bLog} caption="fail2ban.log: nine Found entries, the Ban, then my manual unban." />
          </Block>

          {/* step 5 */}
          <Block
            id="surface"
            label="Step 05"
            title="A smaller attack surface"
            lead="The only services reachable from the network are SSH, HTTP and HTTPS, plus the DHCP client that gives the server its address."
          >
            <Threat>Vulnerabilities in software that runs by default but serves no purpose on a web server.</Threat>
            <div>
              <Sub>Audit</Sub>
              <p className="mb-4 leading-relaxed text-slate-text">
                <C>sudo ss -tulpn</C> listed every listening socket, and I checked each one.
              </p>
              <Table
                head={["Port", "Process", "Reachable from", "Decision"]}
                rows={[
                  ["TCP 22", "sshd", "Network", "Keep: key-only admin access"],
                  ["TCP 80", "nginx", "Network", "Keep: redirects to HTTPS"],
                  ["TCP 443", "nginx", "Network", "Keep: the website"],
                  ["UDP 68 / 546", "systemd-networkd", "Local link", "Keep: DHCP client"],
                  ["53", "systemd-resolved", "Localhost only", "Keep: local DNS lookups"],
                  ["UDP 323", "chronyd", "Localhost only", "Keep: accurate time for log timestamps"],
                ]}
              />
            </div>
            <Shot src={ssTulpn} caption="Every listening socket on the server, from ss -tulpn." />
            <div>
              <Sub>Disabled</Sub>
              <Bullets
                items={[
                  <><C>ModemManager</C>: cellular modem support; the server has no modem</>,
                  <><C>udisks2</C>: desktop-style USB auto-mounting</>,
                  <><C>multipathd</C>: multi-path SAN storage; the VM has one virtual disk</>,
                ]}
              />
              <p className="mt-4 leading-relaxed text-slate-text">
                I kept <C>unattended-upgrades</C> running so security patches install automatically.
              </p>
            </div>
            <div>
              <Sub>Survives a reboot</Sub>
              <p className="leading-relaxed text-slate-text">
                After a full reboot, and an unplanned VM crash, the firewall rules, the fail2ban jail and all
                three services came back on their own, and the HTTPS site loaded.
              </p>
            </div>
            <Shot narrow src={rebootChecks} caption="Post-reboot: firewall active, jail running, and nginx, ssh and fail2ban all active." />
          </Block>

          {/* results */}
          <Block
            id="results"
            label="Results"
            title="Every control, tested"
            lead="I only counted a control as done once a simulated attack showed it working, with log evidence."
          >
            <Table
              head={["Control", "Stops", "Result of the test"]}
              rows={[
                ["SSH keys only", "Password guessing", "Permission denied (publickey)"],
                ["Default-deny firewall", "Exposed services, port scans", "Port 8080 unreachable; UFW BLOCK logged"],
                ["HTTPS, TLS 1.2/1.3", "Eavesdropping, tampering", "301 to HTTPS, then 200 OK"],
                ["Version hidden", "Version-based exploits", "Server: nginx, no version"],
                ["fail2ban", "Automated SSH attacks", "Attacker banned in about 0.4 s"],
                ["Unneeded services off", "Unused, vulnerable software", "Only 22, 80 and 443 exposed"],
              ]}
            />
          </Block>

          {/* lessons */}
          <Block
            id="lessons"
            label="Lessons"
            title="What I'm taking with me"
            lead="The most valuable habit I built was checking which machine I was on, from the shell prompt, before running any command."
          >
            <Bullets
              items={[
                <><span className="font-medium text-white">Always keep a way back in.</span> An open SSH session and the VM console meant a bad config could never lock me out.</>,
                <><span className="font-medium text-white">Validate before applying.</span> <C>sshd -t</C> and <C>nginx -t</C> catch mistakes before a restart can break a service.</>,
                <><span className="font-medium text-white">Override defaults, don&apos;t edit them.</span> Drop-in files survive updates and make my changes easy to find.</>,
                <><span className="font-medium text-white">Test like an attacker.</span> A control isn&apos;t done until an attack proves it.</>,
                <><span className="font-medium text-white">Snapshots make risk cheap.</span> A save point after each stage let me experiment without fear.</>,
              ]}
            />
            <p className="leading-relaxed text-slate-mute">
              Before production I would add a CA-signed certificate with HSTS, security headers in Nginx,
              escalating fail2ban ban times, and central log collection with alerting.
            </p>
          </Block>

          {/* next */}
          <section className="border-t border-slate-line py-16 sm:py-20">
            <Reveal>
              <div className="rounded-2xl border border-dashed border-slate-line p-8">
                <Label>Up next</Label>
                <p className="text-2xl font-bold tracking-tight text-white">A SIEM detection lab</p>
                <p className="mt-3 max-w-2xl leading-relaxed text-slate-mute">
                  This server becomes the log source: SSH, firewall, fail2ban and Nginx logs collected into
                  dashboards, with alerts for brute-force attempts and port scans.
                </p>
                <Link
                  href="/#projects"
                  className="group mt-6 inline-flex items-center gap-1.5 font-medium text-white hover:text-miami"
                >
                  See all projects
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <Footer />
    </MotionProvider>
  );
}
