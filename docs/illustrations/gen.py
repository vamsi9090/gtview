"""Quiet Instrument illustration set for GTview.

Generates six 1200x800 SVG scenes (rendered to PNG/WebP at 2x by render.sh):
hero, position, secure, align, power, kit.
One camera, one subject per frame, Lyft pink only for intent.
"""
from pathlib import Path

OUT = Path(__file__).parent
W, H = 1200, 800
PINK = "#ff00bf"
INK = "#11111f"

DEFS = f"""
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#cfdbe6"/><stop offset=".55" stop-color="#e9eff4"/><stop offset="1" stop-color="#f6f8f9"/>
  </linearGradient>
  <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#c3cfc4"/><stop offset="1" stop-color="#a9b8ab"/>
  </linearGradient>
  <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#a8adb2"/><stop offset="1" stop-color="#7d8287"/>
  </linearGradient>
  <linearGradient id="dash" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2c2c36"/><stop offset=".25" stop-color="#1e1e27"/><stop offset="1" stop-color="#121219"/>
  </linearGradient>
  <linearGradient id="head" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#16161d"/><stop offset="1" stop-color="#24242d"/>
  </linearGradient>
  <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".48" stop-color="#fff" stop-opacity="0"/>
    <stop offset=".5" stop-color="#fff" stop-opacity=".10"/><stop offset=".62" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="body" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2e2e34"/><stop offset="1" stop-color="#17171b"/>
  </linearGradient>
  <linearGradient id="cup" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4a4a52"/><stop offset="1" stop-color="#26262c"/>
  </linearGradient>
  <linearGradient id="mirror" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2a2a33"/><stop offset="1" stop-color="#15151b"/>
  </linearGradient>
  <linearGradient id="mirrorGlass" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#8d96a0"/><stop offset="1" stop-color="#4b525a"/>
  </linearGradient>
  <radialGradient id="kitLight" cx=".5" cy=".38" r=".75">
    <stop offset="0" stop-color="#f7f7f8"/><stop offset="1" stop-color="#e3e4e8"/>
  </radialGradient>
  <filter id="dof" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter>
  <filter id="dofDeep" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="12"/></filter>
  <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000" flood-opacity=".28"/></filter>
  <filter id="lift" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#1b1b2a" flood-opacity=".18"/></filter>
  <filter id="liftSmall" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#1b1b2a" flood-opacity=".2"/></filter>
</defs>"""


def landscape(sharp=False):
    """Road scene beyond the glass. Blurred by default (depth of field)."""
    trees = []
    # Tree masses on both verges, receding toward the vanishing point.
    for x, y, r, c in [
        (90, 352, 70, "#8ea293"), (190, 362, 58, "#7f9585"), (290, 370, 44, "#93a698"), (372, 377, 30, "#869b8b"),
        (440, 381, 20, "#93a597"), (1110, 350, 74, "#82978a"), (1010, 360, 60, "#93a698"), (910, 369, 46, "#7f9585"),
        (828, 376, 32, "#8da191"), (762, 381, 21, "#93a597"),
    ]:
        trees.append(f'<ellipse cx="{x}" cy="{y}" rx="{r}" ry="{r*1.15:.0f}" fill="{c}"/>')
    dashes = []
    # Centre line: trapezoids that grow toward the viewer.
    for i, (y0, y1) in enumerate([(392, 404), (418, 438), (460, 492), (528, 578)]):
        w0, w1 = 1 + i * 1.4, 2 + i * 2.6
        dashes.append(f'<path d="M{600-w0:.1f},{y0} L{600+w0:.1f},{y0} L{600+w1:.1f},{y1} L{600-w1:.1f},{y1}Z" fill="#f4f5f6" opacity=".9"/>')
    body = f"""
    <rect width="{W}" height="{H}" fill="url(#sky)"/>
    <path d="M0,372 C160,342 300,356 430,364 C520,352 640,346 760,360 C900,344 1060,348 1200,368 L1200,800 L0,800Z" fill="#c9d4cf"/>
    <rect y="384" width="{W}" height="420" fill="url(#field)"/>
    {''.join(trees)}
    <path d="M594,386 L606,386 L1010,800 L190,800Z" fill="url(#road)"/>
    <path d="M594,386 L596,386 L236,800 L214,800Z" fill="#c6cacd" opacity=".7"/>
    <path d="M604,386 L606,386 L986,800 L964,800Z" fill="#c6cacd" opacity=".7"/>
    {''.join(dashes)}"""
    return body if sharp else f'<g filter="url(#dof)">{body}</g>'


def cabin(mirror=True):
    """Near interior: headliner, A-pillars, dashboard, rear-view mirror, glass glare."""
    m = ""
    if mirror:
        m = f"""
    <g filter="url(#soft)">
      <rect x="1121" y="0" width="16" height="96" rx="6" fill="#1b1b22"/>
      <rect x="1018" y="92" width="230" height="78" rx="24" fill="url(#mirror)"/>
      <rect x="1030" y="102" width="206" height="58" rx="17" fill="url(#mirrorGlass)" opacity=".85"/>
      <path d="M1036,112 L1100,112 L1078,152 L1036,152Z" fill="#fff" opacity=".07"/>
    </g>"""
    return f"""
    <rect width="{W}" height="{H}" fill="url(#glare)"/>
    <path d="M0,0 H{W} V74 C930,46 270,46 0,74Z" fill="url(#head)"/>
    <path d="M0,70 L64,76 L0,640Z" fill="#1a1a22"/>
    <path d="M{W},70 L{W-64},76 L{W},640Z" fill="#1a1a22"/>
    <path d="M0,640 C280,606 920,606 {W},640 L{W},{H} L0,{H}Z" fill="url(#dash)"/>
    <path d="M0,640 C280,606 920,606 {W},640" fill="none" stroke="#3b3b48" stroke-width="2"/>
    <g opacity=".55">{''.join(f'<rect x="{430+i*26}" y="636" width="16" height="4" rx="2" fill="#0c0c11"/>' for i in range(14))}</g>
    {m}"""


def screen_view(x, y, w, h, extras=""):
    """Live camera preview shown on the phone: the same road, in sharp focus."""
    return f"""
    <svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="330 250 540 550" preserveAspectRatio="xMidYMid slice">
      {landscape(sharp=True)}
    </svg>
    {extras}"""


def phone(cx, top, w=184, h=390, screen_extras="", ghost=False, mount=True, cradle_open=False):
    """Pixel-style handset seen from the driver: screen facing us, camera facing the road."""
    x = cx - w / 2
    r = 24
    bezel = 7
    sx, sy, sw, sh = x + bezel, top + bezel, w - 2 * bezel, h - 2 * bezel
    clip_id = f"scr{int(cx)}{int(top)}{int(w)}"
    op = ' opacity=".38"' if ghost else ""
    mount_svg = ""
    if mount:
        cy = top + h * 0.5
        gap = 14 if cradle_open else 0
        mount_svg = f"""
      <g>
        <ellipse cx="{cx}" cy="{top-10}" rx="54" ry="15" fill="url(#cup)"/>
        <ellipse cx="{cx}" cy="{top-13}" rx="42" ry="9" fill="#55555e" opacity=".55"/>
        <rect x="{cx-9}" y="{top-8}" width="18" height="40" rx="7" fill="#2b2b32"/>
        <rect x="{x-12-gap}" y="{cy-44}" width="16" height="88" rx="7" fill="#26262d"/>
        <rect x="{x+w-4+gap}" y="{cy-44}" width="16" height="88" rx="7" fill="#26262d"/>
        <rect x="{cx-44}" y="{top+h-6}" width="88" height="16" rx="8" fill="#26262d"/>
      </g>"""
    return f"""
    <g{op}>
      {mount_svg if not ghost else ''}
      <g filter="url(#soft)">
        <rect x="{x}" y="{top}" width="{w}" height="{h}" rx="{r}" fill="url(#body)"/>
        <rect x="{x+1.5}" y="{top+1.5}" width="{w-3}" height="{h-3}" rx="{r-1.5}" fill="none" stroke="#5a5a64" stroke-width="1.2" opacity=".7"/>
      </g>
      <clipPath id="{clip_id}"><rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="{r-6}"/></clipPath>
      <g clip-path="url(#{clip_id})">
        {screen_view(sx, sy, sw, sh)}
        <rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" fill="url(#glare)"/>
        {screen_extras}
      </g>
      <circle cx="{cx}" cy="{sy+13}" r="4.2" fill="#0b0b0f"/>
    </g>"""


def rec_marks(cx, top, w=184, h=390):
    """Pink recording dot and frame corners: the phone is capturing."""
    x, y = cx - w / 2 + 7, top + 7
    sw, sh = w - 14, h - 14
    m = 14
    L = 16
    c = []
    for (px, py, dx, dy) in [(x + m, y + m + 22, 1, 1), (x + sw - m, y + m + 22, -1, 1), (x + m, y + sh - m, 1, -1), (x + sw - m, y + sh - m, -1, -1)]:
        c.append(f'<path d="M{px},{py+dy*L} L{px},{py} L{px+dx*L},{py}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".92"/>')
    return f"""
      <rect x="{x+sw/2-30}" y="{y+16}" width="60" height="20" rx="10" fill="#000" opacity=".42"/>
      <circle cx="{x+sw/2-17}" cy="{y+26}" r="4.5" fill="{PINK}"/>
      <rect x="{x+sw/2-8}" y="{y+23.5}" width="28" height="5" rx="2.5" fill="#fff" opacity=".85"/>
      {''.join(c)}"""


def svg(content):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{DEFS}{content}</svg>'


def scene_hero():
    cx, top, w, h = 640, 150, 224, 474
    return svg(landscape() + cabin() + phone(cx, top, w=w, h=h, screen_extras=rec_marks(cx, top, w, h)))


def scene_position():
    cx, cy = 640, 300
    target = f"""
    <circle cx="{cx}" cy="{cy}" r="78" fill="none" stroke="{PINK}" stroke-width="2.5" stroke-dasharray="2 11" stroke-linecap="round"/>
    <circle cx="{cx}" cy="{cy}" r="58" fill="{PINK}" opacity=".08"/>"""
    mount = f"""
    <g filter="url(#soft)">
      <ellipse cx="{cx}" cy="{cy}" rx="54" ry="54" fill="url(#cup)"/>
      <ellipse cx="{cx}" cy="{cy}" rx="40" ry="40" fill="#55555e" opacity=".5"/>
      <ellipse cx="{cx}" cy="{cy}" rx="14" ry="14" fill="#2b2b32"/>
    </g>"""
    # Two converging chevrons: press the cup flat against the glass.
    chev = "".join(
        f'<path d="M{cx+s*150},{cy-22} L{cx+s*128},{cy} L{cx+s*150},{cy+22}" fill="none" stroke="{PINK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
        for s in (-1, 1))
    return svg(landscape() + cabin() + target + mount + chev)


def scene_secure():
    cx, top = 640, 236
    # Ghost of the phone above, seated phone below: a single, measured motion.
    arrow = f"""
    <path d="M{cx-196},{top+150} L{cx-128},{top+150}" stroke="{PINK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M{cx-146},{top+133} L{cx-126},{top+150} L{cx-146},{top+167}" fill="none" stroke="{PINK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>"""
    clicks = "".join(
        f'<path d="M{cx+s*(92+18)},{top+175} q{s*12},20 0,40" fill="none" stroke="{PINK}" stroke-width="4" stroke-linecap="round" opacity="{o}"/>'
        for s in (-1, 1) for o in (1,))
    return svg(landscape() + cabin() + phone(cx - 300, top - 40, ghost=True, mount=False)
               + phone(cx, top) + arrow + clicks)


def scene_align():
    # Close on the screen: level horizon and a centred road.
    cx, top, w, h = 600, 60, 320, 680
    x, y = cx - w / 2 + 7, top + 7
    sw = w - 14
    horizon_y = top + 7 + (386 - 300) * ((h - 14) / 520) * 0.98
    guide = f"""
      <line x1="{x+18}" y1="{horizon_y:.1f}" x2="{x+sw-18}" y2="{horizon_y:.1f}" stroke="{PINK}" stroke-width="3.5" stroke-dasharray="14 9" stroke-linecap="round"/>
      <circle cx="{cx}" cy="{horizon_y:.1f}" r="22" fill="none" stroke="#fff" stroke-width="3" opacity=".95"/>
      <line x1="{cx}" y1="{horizon_y-34:.1f}" x2="{cx}" y2="{horizon_y-26:.1f}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <line x1="{cx}" y1="{horizon_y+26:.1f}" x2="{cx}" y2="{horizon_y+34:.1f}" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="{cx-58}" y="{top+h-96}" width="116" height="34" rx="17" fill="#000" opacity=".45"/>
      <circle cx="{cx-34}" cy="{top+h-79}" r="7" fill="none" stroke="#fff" stroke-width="2.5"/>
      <path d="M{cx-38},{top+h-79} l3,3 l6,-7" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="{cx-18}" y="{top+h-82}" width="56" height="6" rx="3" fill="#fff" opacity=".85"/>"""
    # Overscan the blurred backdrop so the blur never pulls dark edges into the frame.
    bg = f'<g transform="translate(-48 -32) scale(1.08)"><g filter="url(#dofDeep)">{landscape(sharp=True)}{cabin(mirror=False)}</g></g>'
    return svg(bg + phone(cx, top, w=w, h=h, screen_extras=guide, mount=False))


def scene_power():
    cx, top = 640, 200
    px_bottom = top + 390
    # Cable: from the phone's base, down and across the dash edge, tucked by two clips.
    cable = f"""
    <path d="M{cx},{px_bottom+8} C{cx},{px_bottom+40} {cx-40},{px_bottom+48} {cx-120},{px_bottom+52}
             S 300,628 170,630 S 60,640 34,700" fill="none" stroke="#e9e9ec" stroke-width="7" stroke-linecap="round"/>
    <path d="M{cx},{px_bottom+8} C{cx},{px_bottom+40} {cx-40},{px_bottom+48} {cx-120},{px_bottom+52}
             S 300,628 170,630 S 60,640 34,700" fill="none" stroke="#b9b9c0" stroke-width="7" stroke-linecap="round" stroke-dasharray="0 0" opacity=".25"/>
    <rect x="{cx-9}" y="{px_bottom-2}" width="18" height="22" rx="5" fill="#d9d9de"/>"""
    clips = "".join(
        f'<g filter="url(#liftSmall)"><rect x="{x-16}" y="{y-11}" width="32" height="22" rx="7" fill="{PINK}"/>'
        f'<rect x="{x-9}" y="{y-3}" width="18" height="6" rx="3" fill="#fff" opacity=".9"/></g>'
        for x, y in [(398, 622), (176, 630)])
    return svg(landscape() + cabin() + phone(cx, top, screen_extras=rec_marks(cx, top)) + cable + clips)


def scene_kit():
    # Top-down flat-lay: phone back, suction mount, coiled cable, two clips.
    phone_back = f"""
    <g filter="url(#lift)" transform="rotate(-8 330 400)">
      <rect x="230" y="190" width="200" height="420" rx="32" fill="#e7e3dc"/>
      <rect x="232" y="192" width="196" height="416" rx="30" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/>
      <rect x="230" y="262" width="200" height="54" fill="#1c1c21"/>
      <circle cx="292" cy="289" r="15" fill="#2d2d34"/><circle cx="292" cy="289" r="8" fill="#0d0d12"/>
      <circle cx="338" cy="289" r="15" fill="#2d2d34"/><circle cx="338" cy="289" r="8" fill="#0d0d12"/>
      <circle cx="382" cy="289" r="6" fill="#f1e9d6" opacity=".9"/>
      <circle cx="330" cy="520" r="11" fill="none" stroke="#cfc9bf" stroke-width="3"/>
    </g>"""
    mount = f"""
    <g filter="url(#lift)" transform="rotate(10 640 330)">
      <circle cx="640" cy="250" r="92" fill="#2c2c33"/>
      <circle cx="640" cy="250" r="72" fill="#3b3b44"/>
      <circle cx="640" cy="250" r="30" fill="#24242a"/>
      <rect x="626" y="250" width="28" height="140" rx="12" fill="#2a2a31"/>
      <path d="M560,380 h160 a18,18 0 0 1 18,18 v96 a18,18 0 0 1 -18,18 h-20 v-84 h-120 v84 h-20 a18,18 0 0 1 -18,-18 v-96 a18,18 0 0 1 18,-18z" fill="#2f2f37"/>
      <rect x="600" y="474" width="80" height="26" rx="10" fill="#26262d"/>
    </g>"""
    coils = "".join(
        f'<circle cx="930" cy="330" r="{r}" fill="none" stroke="#f3f3f5" stroke-width="13"/>'
        f'<circle cx="930" cy="330" r="{r}" fill="none" stroke="#c9c9cf" stroke-width="13" stroke-dasharray="1 0" opacity=".18"/>'
        for r in (118, 100, 82))
    cable = f"""
    <g filter="url(#lift)">
      {coils}
      <path d="M1048,330 C1060,420 1020,470 960,500" fill="none" stroke="#f3f3f5" stroke-width="13" stroke-linecap="round"/>
      <rect x="930" y="487" width="44" height="26" rx="7" fill="#e2e2e6" transform="rotate(-24 952 500)"/>
      <rect x="954" y="493" width="16" height="10" rx="3" fill="#a9a9b1" transform="rotate(-24 952 500)"/>
      <path d="M860,268 l40,-30 l12,16 l-40,30z" fill="{PINK}"/>
    </g>"""
    clips = "".join(
        f'<g filter="url(#liftSmall)" transform="rotate({a} {x} {y})"><rect x="{x-34}" y="{y-24}" width="68" height="48" rx="14" fill="#2c2c33"/>'
        f'<rect x="{x-22}" y="{y-6}" width="44" height="12" rx="6" fill="#4a4a54"/></g>'
        for x, y, a in [(820, 600, -6), (940, 640, 9)])
    bg = f'<rect width="{W}" height="{H}" fill="url(#kitLight)"/>'
    return svg(bg + phone_back + mount + cable + clips)


SCENES = {
    "hero": scene_hero, "position": scene_position, "secure": scene_secure,
    "align": scene_align, "power": scene_power, "kit": scene_kit,
}

if __name__ == "__main__":
    for name, fn in SCENES.items():
        (OUT / f"{name}.svg").write_text(fn(), encoding="utf-8")
        print("wrote", name)


def scene_hero_landscape():
    """Looking up and forward: landscape phone mounted high on the glass, frit band, headliner."""
    cx, top, w, h = 600, 168, 440, 214
    x = cx - w / 2
    r = 26
    bezel = 8
    sx, sy, sw, sh = x + bezel, top + bezel, w - 2 * bezel, h - 2 * bezel
    # Ceramic frit: dot matrix fading down from the top edge of the glass.
    dots = []
    for row in range(8):
        y = 90 + row * 9.5
        rad = 3.4 - row * 0.4
        for col in range(0, 128):
            dx = col * 9.5 + (4.75 if row % 2 else 0)
            dots.append(f'<circle cx="{dx:.1f}" cy="{y}" r="{rad:.2f}" fill="#101016"/>')
    frit = f'<g opacity=".92">{"".join(dots)}</g><path d="M0,0 H{W} V92 C930,74 270,74 0,92Z" fill="#101016"/>'
    # Headliner fabric with a soft woven texture.
    headliner = f"""
    <path d="M0,0 H{W} V58 C930,36 270,36 0,58Z" fill="#2a2a31"/>
    <path d="M0,0 H{W} V58 C930,36 270,36 0,58Z" fill="url(#weave)" opacity=".35"/>
    <path d="M0,58 C270,36 930,36 {W},58" fill="none" stroke="#3a3a43" stroke-width="2"/>"""
    rec = f"""
      <rect x="{sx+16}" y="{sy+14}" width="74" height="28" rx="14" fill="#000" opacity=".5"/>
      <circle cx="{sx+33}" cy="{sy+28}" r="5.5" fill="{PINK}"/>
      <text x="{sx+45}" y="{sy+33.5}" font-family="-apple-system,Segoe UI,Inter,sans-serif" font-size="15" font-weight="700" fill="#fff" letter-spacing=".06em">REC</text>"""
    clip_id = "scrLand"
    phone_svg = f"""
    <g>
      <ellipse cx="{cx}" cy="{top-50}" rx="54" ry="18" fill="url(#cup)"/>
      <ellipse cx="{cx}" cy="{top-53}" rx="41" ry="11" fill="#5a5a63" opacity=".55"/>
      <path d="M{cx-10},{top-44} L{cx+10},{top-44} L{cx+14},{top+8} L{cx-14},{top+8}Z" fill="#26262d"/>
      <circle cx="{cx}" cy="{top-14}" r="11" fill="#33333b"/>
      <rect x="{x+26}" y="{top-10}" width="{w-52}" height="16" rx="8" fill="#22222a"/>
      <rect x="{x+26}" y="{top+h-6}" width="{w-52}" height="16" rx="8" fill="#22222a"/>
      <g filter="url(#soft)">
        <rect x="{x}" y="{top}" width="{w}" height="{h}" rx="{r}" fill="url(#body)"/>
        <rect x="{x+1.5}" y="{top+1.5}" width="{w-3}" height="{h-3}" rx="{r-1.5}" fill="none" stroke="#5a5a64" stroke-width="1.2" opacity=".7"/>
      </g>
      <clipPath id="{clip_id}"><rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" rx="{r-7}"/></clipPath>
      <g clip-path="url(#{clip_id})">
        <svg x="{sx}" y="{sy}" width="{sw}" height="{sh}" viewBox="260 300 680 330" preserveAspectRatio="xMidYMid slice">{landscape(sharp=True)}</svg>
        <rect x="{sx}" y="{sy}" width="{sw}" height="{sh}" fill="url(#glare)"/>
        {rec}
      </g>
      <circle cx="{x+w-15}" cy="{top+h/2}" r="4.2" fill="#0b0b0f"/>
    </g>"""
    mirror = f"""
    <g filter="url(#soft)">
      <rect x="1100" y="0" width="18" height="150" rx="7" fill="#1b1b22"/>
      <rect x="990" y="140" width="260" height="92" rx="28" fill="url(#mirror)"/>
      <rect x="1004" y="152" width="236" height="68" rx="20" fill="url(#mirrorGlass)" opacity=".85"/>
      <path d="M1010,162 L1084,162 L1060,210 L1010,210Z" fill="#fff" opacity=".07"/>
    </g>"""
    weave = """<pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0,3 H6 M3,0 V6" stroke="#4a4a54" stroke-width=".6"/></pattern>"""
    # Looking up: shift the world down so the frame is mostly sky, glass and phone.
    world = f'<g transform="translate(0 120)">{landscape()}</g><rect width="{W}" height="122" fill="#cad6e1"/>'
    pillars = f'<path d="M0,40 L58,52 L0,800Z" fill="#1a1a22"/><path d="M{W},40 L{W-58},52 L{W},800Z" fill="#1a1a22"/>'
    glare = f'<rect width="{W}" height="{H}" fill="url(#glare)"/>'
    content = world + glare + pillars + frit + headliner + mirror + phone_svg
    return svg(content).replace("</defs>", weave + "</defs>", 1)


SCENES["hero-landscape"] = scene_hero_landscape
