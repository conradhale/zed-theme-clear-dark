import Color, { type ColorInstance } from "color";
import { writeFileSync } from "node:fs";

const theme_name = "Clear Dark";
const author = "Conrad Hale";

const colors = {
  transparent: Color.rgb(0, 0, 0, 0),
  black: Color.rgb(17, 17, 19),
  white: Color.rgb(242, 244, 248),
  red: Color.rgb(245, 69, 69),
  coral: Color.rgb(250, 126, 142),
  auburn: Color.rgb(224, 125, 112),
  orange: Color.rgb(250, 139, 65),
  peach: Color.rgb(253, 207, 148),
  yellow: Color.rgb(242, 212, 82),
  green: Color.rgb(92, 242, 102),
  mint: Color.rgb(148, 246, 156),
  sea: Color.rgb(122, 250, 227),
  cyan: Color.rgb(98, 225, 248),
  slate: Color.rgb(168, 206, 228),
  sky: Color.rgb(180, 203, 250),
  blue: Color.rgb(90, 152, 248),
  indigo: Color.rgb(124, 120, 252),
  violet: Color.rgb(172, 171, 255),
  lavender: Color.rgb(206, 176, 252),
  purple: Color.rgb(213, 138, 255),
  magenta: Color.rgb(242, 75, 147),
  salmon: Color.rgb(250, 175, 175),
};

const accented = (color: ColorInstance, amount: number = 0.5) =>
  color.mix(colors.blue, amount);

const grays = Object.fromEntries(
  [
    25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 700, 800, 850, 900, 950,
  ].map((level) => [level, colors.black.mix(colors.white, level * 0.001)]),
);

const theme_colors = {
  background: grays["25"],
  foreground: colors.white,
  tab: {
    active_background: grays["50"],
    inactive_background: grays["25"],
  },
  tab_bar: {
    background: grays["25"],
  },
  title_bar: {
    background: grays["25"],
  },
  toolbar: {
    background: grays["50"],
  },
  drop_target: {
    background: grays["200"],
  },
  border: {
    "": grays["150"],
    transparent: colors.transparent,
    disabled: grays["75"],
    focused: accented(grays["150"]),
    selected: accented(grays["150"]),
    variant: grays["200"],
  },
  element: {
    background: grays["75"],
    hover: grays["150"],
    active: grays["250"],
    selected: accented(grays["75"]),
    disabled: grays["50"],
  },
  ghost_element: {
    background: colors.transparent,
    hover: grays["100"],
    active: grays["200"],
    selected: accented(grays["25"]),
    disabled: colors.transparent,
  },
  editor: {
    background: grays["25"],
    foreground: colors.white,
    line_number: grays["400"],
    active_line_number: grays["900"],
    wrap_guide: grays["200"],
    active_wrap_guide: grays["300"],
    invisible: grays["250"].fade(0.5),
    document_highlight: {
      read_background: accented(colors.white).fade(0.95),
      write_background: accented(colors.white).fade(0.8),
    },
    active_line: {
      background: grays["75"],
    },
    highlighted_line: {
      background: grays["50"],
    },
    gutter: {
      background: grays["25"],
    },
    subheader: {
      background: grays["25"],
    },
  },
  icon: {
    "": colors.white,
    muted: grays["800"],
    disabled: grays["500"],
    placeholder: grays["500"],
    accent: accented(grays["600"]),
  },
  text: {
    "": colors.white,
    muted: grays["800"],
    disabled: grays["500"],
    placeholder: grays["500"],
    accent: accented(grays["600"]),
  },
  scrollbar: {
    thumb: {
      border: grays["500"],
      background: grays["300"].fade(0.7),
      hover_background: grays["300"].fade(0.45),
    },
    track: {
      background: grays["25"],
      border: grays["150"],
    },
  },
  link_text: {
    hover: colors.blue,
  },
  panel: {
    background: grays["50"],
    focused_border: colors.blue,
  },
  pane: {
    focused_border: colors.blue,
  },
  status_bar: {
    background: colors["50"],
  },
  surface: {
    background: colors["25"],
  },
  elevated_surface: {
    background: colors["50"],
  },
  search: {
    match_background: accented(grays["25"]).fade(0.5),
  },
  ...Object.fromEntries(
    Object.entries({
      created: colors.green,
      conflict: colors.yellow,
      deleted: colors.red,
      success: colors.green,
      warning: colors.yellow,
      error: colors.red,
      modified: colors.yellow,
      renamed: colors.blue,
      info: colors.blue,
      hint: colors.violet,
      predictive: accented(grays["500"]),
      unreachable: grays["700"],
      ignored: grays["500"],
      hidden: grays["500"],
    }).flatMap(([k, v]) => [
      [k, v],
      [`${k}.background`, v.fade(0.8)],
      [`${k}.border`, v.mix(grays["25"], 0.6)],
    ]),
  ),
  terminal: {
    background: grays["25"],
    foreground: grays["900"],
    dim_foreground: grays["600"],
    bright_foreground: colors.white,
    ansi: Object.fromEntries(
      Object.entries({
        black: colors.black,
        blue: colors.blue,
        cyan: colors.cyan,
        green: colors.green,
        magenta: colors.purple,
        red: colors.red,
        white: colors.white,
        yellow: colors.yellow,
      }).flatMap(([k, v]) => [
        [k, v],
        [`dim_${k}`, v.mix(grays["25"], 0.5)],
        [`bright_${k}`, v.lighten(0.16)],
      ]),
    ),
  },
};

type SyntaxColor = {
  color?: ColorInstance;
  font_style?: string;
  font_weight?: number;
};
const syntax_colors: [string, SyntaxColor][] = Object.entries({
  attribute: {
    color: colors.violet,
  },
  boolean: {
    color: colors.indigo,
  },
  comment: {
    color: grays["600"],
    font_style: "italic",
  },
  "comment.doc": {
    color: grays["600"],
    font_style: "italic",
    font_weight: 400,
  },
  constant: {
    color: colors.blue,
    font_weight: 400,
  },
  constructor: {
    color: colors.slate,
  },
  embedded: {
    color: colors.blue,
  },
  emphasis: {
    color: colors.blue,
    font_style: "italic",
  },
  "emphasis.strong": {
    color: colors.blue,
    font_weight: 700,
  },
  enum: {
    color: colors.blue,
    font_weight: 700,
  },
  function: {
    color: colors.violet,
  },
  "function.method": {
    color: colors.lavender,
  },
  "function.special.definition": {
    color: colors.coral,
  },
  keyword: {
    color: colors.auburn,
  },
  label: {
    color: colors.magenta,
  },
  link_text: {
    color: colors.cyan,
  },
  link_uri: {
    color: colors.cyan,
  },
  number: {
    color: colors.white,
  },
  operator: {
    color: colors.coral,
  },
  predictive: {
    color: accented(grays["500"]),
  },
  preproc: {
    color: grays["700"],
  },
  primary: {
    color: colors.blue,
  },
  property: {
    color: colors.sky,
  },
  punctuation: {
    color: grays["800"],
  },
  "punctuation.bracket": {
    color: colors.salmon,
  },
  "punctuation.delimiter": {
    color: grays["700"],
  },
  "punctuation.list_marker": {
    color: grays["700"],
  },
  "punctuation.special": {
    color: colors.salmon,
  },
  string: {
    color: colors.peach,
  },
  "string.escape": {
    color: colors.coral,
  },
  "string.regex": {
    color: colors.mint,
  },
  "string.special": {
    color: colors.violet,
  },
  "string.special.symbol": {
    color: colors.lavender,
  },
  tag: {
    color: colors.sky,
  },
  "text.literal": {
    color: colors.blue,
  },
  title: {
    color: colors.magenta,
    font_weight: 700,
  },
  type: {
    color: colors.mint,
  },
  "type.builtin": {
    color: colors.mint,
  },
  variable: {
    color: colors.sea,
  },
  "variable.special": {
    color: colors.coral,
  },
});

type ThemeColors = { [k: string]: ColorInstance | ThemeColors };

const mapThemeColors = (theme: ThemeColors, prefix?: string) =>
  Object.entries(theme).flatMap(([k, v]) => {
    k = prefix && k ? `${prefix}.${k}` : (prefix ?? k ?? "");
    if (Color.prototype.isPrototypeOf(v)) {
      return [[k, (v as ColorInstance).hexa()]];
    } else {
      return v ? mapThemeColors(v as ThemeColors, k) : [];
    }
  });

const theme_style = Object.fromEntries([
  [
    "players",
    [
      colors.blue,
      colors.magenta,
      colors.cyan,
      colors.purple,
      colors.orange,
      colors.green,
      colors.yellow,
      colors.red,
    ].map((color) => ({
      background: color.hexa(),
      cursor: color.hexa(),
      selection: color.fade(0.8).hexa(),
    })),
  ],
  [
    "syntax",
    Object.fromEntries(
      syntax_colors.map(([k, v]) => [
        k,
        {
          color: v.color?.hexa() ?? null,
          font_style: v.font_style ?? null,
          font_weight: v.font_weight ?? null,
        },
      ]),
    ),
  ],
  ...mapThemeColors(theme_colors),
]);

const theme_json = {
  $schema: "https://zed.dev/schema/themes/v0.2.0.json",
  name: theme_name,
  author: author,
  themes: [
    {
      name: theme_name,
      appearance: "dark",
      style: theme_style,
    },
  ],
};

writeFileSync(`themes/${theme_name}.json`, JSON.stringify(theme_json));
