function extractHueFromString(hslColor: string): number {
  // Extract the number from the "hsl(x, y%, z%)" string
  const hueMatch = hslColor.match(/^hsl\((\d+),/)!; // Use non-null assertion
  //   console.log(parseInt(hueMatch[1], 10));
  return parseInt(hueMatch[1], 10);
}

export function createGradient(hslColor: string, type: any): string {
  const dominantHue = hslColor !== null ? extractHueFromString(hslColor) : 240;
  // const topColorWithOpacity = `hsla(${dominantHue}, 24%, 9%, 0.5)`;
  const topColor = `hsla(${dominantHue}, 24%, 9%, 1)`;
  const bottomColor = `hsla(${dominantHue}, 50%, 13%, 1)`;

  if (type === "secondary") {
    return `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 10%, ${topColor} 100%)`;
  }

  return `linear-gradient(180deg, ${topColor} 50%, ${bottomColor} 100%)`;
}
