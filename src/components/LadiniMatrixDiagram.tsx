import React, { useRef } from 'react';
import { MatrixValues } from '@/core/calc';
import { reduceTo22Strict as reduceTo22, getEnergyTimeline, calculateAgeEnergies } from '@/core/utils';

interface LadiniMatrixDiagramProps {
  matrix: MatrixValues;
  theme?: 'light' | 'dark';
  size?: number;
  showAgeRing?: boolean;
  showBadges?: boolean;
  onRef?: (ref: SVGSVGElement | null) => void;
  birthDate?: { day: number; month: number; year: number };
  isCompatibility?: boolean;
}

export const LadiniMatrixDiagram: React.FC<LadiniMatrixDiagramProps> = ({
  matrix,
  theme = 'light',
  size = 800,
  showAgeRing = true,
  showBadges = true,
  onRef,
  birthDate,
  isCompatibility = false
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (onRef) {
      onRef(containerRef.current as any);
    }
  }, [onRef]);

  const centerX = size / 2;
  const centerY = size / 2;

  const ageRingRadius = size * 0.38; // Reduced from 0.40 to prevent mobile clipping
  const ageRingLabelRadius = size * 0.42; // Adjusted proportionally

  const centerNodeRadius = size * 0.060; // Reduced for better spacing
  const primaryNodeRadius = size * 0.036; // Reduced for better spacing
  const secondaryNodeRadius = size * 0.024; // Reduced for better spacing
  const smallNodeRadius = size * 0.014; // Reduced for better spacing
  const tinyNodeRadius = size * 0.014; // Reduced for better spacing

  // Precise sizing: Shrink squares to be inside the age ring
  // UPDATED: User requested main nodes (A,B,C,D) to "just touch" the outer line (not sit on it).
  // So radius = outer_ring - node_radius
  const innerSquareRadius = ageRingRadius - primaryNodeRadius;
  const innerSquareHalf = innerSquareRadius / Math.sqrt(2);
  // Calculate node positions
  // Note: innerSquareRadius is already calculated relative to ageRingRadius

  const nodePositions = {
    soulComfortZone: { x: centerX, y: centerY, id: 'e' },

    // Primary nodes at inner square corners
    mainTalent: { x: centerX, y: centerY - innerSquareRadius, id: 'b' },
    mainProcessing: { x: centerX, y: centerY + innerSquareRadius, id: 'd' },
    resourceZone: { x: centerX - innerSquareRadius, y: centerY, id: 'a' },
    soulTask: { x: centerX + innerSquareRadius, y: centerY, id: 'c' },

    // Corner nodes (now strictly inside the circle)
    maleLineage1: { x: centerX - innerSquareHalf, y: centerY - innerSquareHalf, id: 'f' },
    femaleLineage1: { x: centerX + innerSquareHalf, y: centerY - innerSquareHalf, id: 'g' },
    femaleLineage2: { x: centerX - innerSquareHalf, y: centerY + innerSquareHalf, id: 'k' },
    maleLineage2: { x: centerX + innerSquareHalf, y: centerY + innerSquareHalf, id: 'y' }
  };

  // Ratios for intermediate nodes - calculated to prevent overlapping
  // Gap between ratio1 and ratio2 must be > (smallNodeRadius + secondaryNodeRadius) / innerSquareRadius
  const midRatio1 = 0.72; // Slightly increased to move a1/b1/c1/d1 outward
  const midRatio2 = 0.83; // Very minor adjustment toward a1/b1/c1/d1
  const midRatio3 = 0.354; // Midpoint between side center and center

  const intermediateNodes = {
    // Vertical Axis (Top)
    topMid1: { x: centerX, y: centerY - innerSquareRadius * midRatio1, id: 'b1' }, // Near Center (Side Side Center)
    topMid2: { x: centerX, y: centerY - innerSquareRadius * midRatio2, id: 'b2' }, // Near Edge

    // Vertical Axis (Bottom)
    bottomMid1: { x: centerX, y: centerY + innerSquareRadius * midRatio1, id: 'd1' },
    bottomMid2: { x: centerX, y: centerY + innerSquareRadius * midRatio2, id: 'd2' },

    // Horizontal Axis (Left)
    leftMid1: { x: centerX - innerSquareRadius * midRatio1, y: centerY, id: 'a1' },
    leftMid2: { x: centerX - innerSquareRadius * midRatio2, y: centerY, id: 'a2' },

    // Horizontal Axis (Right)
    rightMid1: { x: centerX + innerSquareRadius * midRatio1, y: centerY, id: 'c1' },
    rightMid2: { x: centerX + innerSquareRadius * midRatio2, y: centerY, id: 'c2' },

    // Diagonals (Outer Square to Center)
    topLeftMid1: { x: centerX - innerSquareHalf * midRatio1, y: centerY - innerSquareHalf * midRatio1, id: 's1', isDiagonal: true }, // Near Center
    topLeftMid2: { x: centerX - innerSquareHalf * midRatio2, y: centerY - innerSquareHalf * midRatio2, id: 's2', isDiagonal: true }, // Near Edge

    topRightMid1: { x: centerX + innerSquareHalf * midRatio1, y: centerY - innerSquareHalf * midRatio1, id: 'p1', isDiagonal: true },
    topRightMid2: { x: centerX + innerSquareHalf * midRatio2, y: centerY - innerSquareHalf * midRatio2, id: 'p2', isDiagonal: true },

    bottomLeftMid1: { x: centerX - innerSquareHalf * midRatio1, y: centerY + innerSquareHalf * midRatio1, id: 'p3', isDiagonal: true },
    bottomLeftMid2: { x: centerX - innerSquareHalf * midRatio2, y: centerY + innerSquareHalf * midRatio2, id: 'p4', isDiagonal: true },

    bottomRightMid1: { x: centerX + innerSquareHalf * midRatio1, y: centerY + innerSquareHalf * midRatio1, id: 's4', isDiagonal: true }, // Near Center
    bottomRightMid2: { x: centerX + innerSquareHalf * midRatio2, y: centerY + innerSquareHalf * midRatio2, id: 's3', isDiagonal: true }, // Near Edge

    // Inner Points (midway to absolute center)
    topInner: { x: centerX, y: centerY - innerSquareRadius * midRatio3, id: 'b3' },
    leftInner: { x: centerX - innerSquareRadius * midRatio3, y: centerY, id: 'a3' },
    // Tight clustered sequence on right: e -> e1 -> e2 (closer spacing like other nodes)
    rightInner1: { x: centerX + centerNodeRadius + secondaryNodeRadius, y: centerY, id: 'e1' },
    rightInner2: { x: centerX + centerNodeRadius + secondaryNodeRadius * 2 + smallNodeRadius, y: centerY, id: 'e2' }
  };

  // Prosperity line nodes
  // d1 is at (centerX, centerY + radius * 0.66)
  // c1 is at (centerX + radius * 0.66, centerY)
  // Line connects them.
  // x1, x, x2 are on this line.

  const prosperityLineNodes = {
    x1: {
      x: intermediateNodes.bottomMid1.x + (intermediateNodes.rightMid1.x - intermediateNodes.bottomMid1.x) * 0.25,
      y: intermediateNodes.bottomMid1.y + (intermediateNodes.rightMid1.y - intermediateNodes.bottomMid1.y) * 0.25,
      id: 'x1'
    },
    x: {
      x: intermediateNodes.bottomMid1.x + (intermediateNodes.rightMid1.x - intermediateNodes.bottomMid1.x) * 0.50,
      y: intermediateNodes.bottomMid1.y + (intermediateNodes.rightMid1.y - intermediateNodes.bottomMid1.y) * 0.50,
      id: 'x'
    },
    x2: {
      x: intermediateNodes.bottomMid1.x + (intermediateNodes.rightMid1.x - intermediateNodes.bottomMid1.x) * 0.75,
      y: intermediateNodes.bottomMid1.y + (intermediateNodes.rightMid1.y - intermediateNodes.bottomMid1.y) * 0.75,
      id: 'x2'
    }
  };

  // Comfort zone circle radius
  const comfortZoneRadius = innerSquareRadius * midRatio1 * 1.2; // Slightly larger than the first ring of nodes

  // Get numerology color based on Rule 1 (Value) and Rule 2 (Position)
  const getNumerologyColor = (nodeId: string, number: number): string => {
    // RULE 0: Theme-Adaptive Overrides (Black/White)
    const themeAdaptiveNodes = ['f', 's2', 's1', 'g', 'p2', 'p1', 'e1', 'e2', 's4', 's3', 'y', 'k', 'p4', 'p3'];
    if (themeAdaptiveNodes.includes(nodeId)) {
      return theme === 'dark' ? '#1a1a1a' : '#FFFFFF';
    }

    // Fixed Prosperity/Karma colors (rgb(101, 82, 176) -> #6552B0)
    if (['x', 'x1', 'x2', 'c2', 'd2'].includes(nodeId)) {
      return '#6552B0';
    }

    // RULE 1: Fixed Position-based colors (Chakra & Function)
    const positionColors: Record<string, string> = {
      a: '#900490ff', b: '#900490ff', // Sahasrara (Violet)
      c: 'rgba(247, 40, 40, 1)', d: '#f72828ff', // Muladhara (Red)
      e: '#dbdb0bff', // Manipura (Yellow)
      a1: '#00BFFF', b1: '#00BFFF', // Vishuddha (Blue)
      a2: '#3a06e2ff', b2: '#3a06e2ff', // Ajna (Indigo)
      a3: '#13bc13ff', b3: '#13bc13ff', // Anahata (Green)
      c1: '#ee9120ff', d1: '#ee9120ff', // Svadhishthana (Orange)
      c3: '#ee9120ff', d3: '#ee9120ff'
    };

    if (positionColors[nodeId]) {
      return positionColors[nodeId];
    }

    // RULE 2: Value-based colors (1-7)
    const valueColors: Record<number, string> = {
      1: '#f72828ff', // Red
      2: '#FF8C00', // Orange
      3: '#FFFF00', // Yellow
      4: '#13bc13ff', // Green
      5: '#00BFFF', // Blue
      6: '#3a06e2ff', // Indigo
      7: '#900490ff'  // Violet
    };

    if (number >= 1 && number <= 7) {
      return valueColors[number];
    }

    // RULE 3: Default fallback
    return theme === 'dark' ? '#222222' : '#FFFFFF';
  };

  // UI styles - ALWAYS use light mode colors for export readability or if theme is light
  const isDark = theme === 'dark';
  const strokeColor = isDark ? 'rgba(255, 255, 255, 0.4)' : '#000000';
  const defaultTextColor = isDark ? '#EEEEEE' : '#010101';
  // Node border color based on theme
  const nodeBorderColor = isDark ? 'rgba(255, 255, 255, 0.5)' : '#000000';

  // Render simple clean circular node
  const renderNode = (
    x: number,
    y: number,
    radius: number,
    number: number,
    fontSize: number = 24, // Increased from 20
    nodeId: string
  ) => {
    const nodeColor = getNumerologyColor(nodeId, number);
    const isLightColor = (hex: string) => {
      const h = hex.toLowerCase();
      // White, Yellow, Orange, and Light Violet are "light" backgrounds
      return h === '#ffffff' || h === '#ffff00' || h === '#ff8c00' || h === '#ee82ee';
    };

    const isLight = isLightColor(nodeColor);
    const textColor = isLight ? '#000000' : '#FFFFFF';

    // Add border only if visually necessary
    const needsBorder = (nodeColor.toLowerCase() === '#ffffff') ||
      (isDark && (nodeColor.toLowerCase() === '#333333' || nodeColor.toLowerCase() === '#000000'));
    const borderStroke = needsBorder ? nodeBorderColor : 'none';

    return (
      <g>
        {/* Main Node - Border only for white/black nodes */}
        <circle
          cx={x}
          cy={y}
          r={radius}
          fill={nodeColor}
          stroke={borderStroke}
          strokeWidth={needsBorder ? "1.5" : "0"}
        />
        <text
          x={x}
          y={y}
          fill={textColor}
          fontSize={fontSize}
          fontWeight="normal"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Arial, sans-serif"
        >
          {number}
        </text>
      </g>
    );
  };

  // Generate necessary defs - simplified for clean design
  const generateStyles = () => {
    return (
      <defs>
        {/* Removed glow and shadow filters for cleaner, minimal design */}
      </defs>
    );
  };

  // Generate age ring ticks and labels
  const generateAgeRingTicks = () => {
    const ticks = [];
    const totalTicks = 64; // 8 sectors * 8 points per sector

    // Custom age label formatter to match reference rounding:
    // .25 -> .3, .75 -> .7, .5 -> .5, integer -> integer
    const formatAgeLabel = (val: number) => {
      if (val % 1 === 0) return val.toString();
      let text = '';
      if (Math.abs((val % 1) - 0.25) < 0.01) text = (Math.floor(val) + 0.3).toFixed(1);
      else if (Math.abs((val % 1) - 0.5) < 0.01) text = (Math.floor(val) + 0.5).toFixed(1);
      else if (Math.abs((val % 1) - 0.75) < 0.01) text = (Math.floor(val) + 0.7).toFixed(1);
      else text = val.toFixed(1);
      return text.replace('.', ',');
    };

    // Anchors as seen in reference: 0, 10, 20, 30, 40, 50, 60, 70
    const anchorValues = [matrix.a, matrix.f, matrix.b, matrix.g, matrix.c, matrix.y, matrix.d, matrix.k];
    const ageEnergies = calculateAgeEnergies(anchorValues);

    for (let i = 0; i < totalTicks; i++) {
      const age = (i / totalTicks) * 80;
      const nextAge = ((i + 1) / totalTicks) * 80;
      const angle = 180 - (i / totalTicks) * 360;
      const angleRad = (angle * Math.PI) / 180;

      const energy = ageEnergies[i];
      const isMajorTick = i % 8 === 0; // 0, 10, 20...
      const ageLabelValue = Math.round(age);

      if (isMajorTick) {
        // Move labels slightly further out relative to new radius
        const ageLabelRadius = ageRingRadius + 55;
        const ageLabelX = centerX + ageLabelRadius * Math.cos(angleRad);
        const ageLabelY = centerY - ageLabelRadius * Math.sin(angleRad);

        ticks.push(
          <g key={`age-${age}`}>
            <circle
              cx={ageLabelX}
              cy={ageLabelY}
              r="14"
              fill={theme === 'dark' ? '#111111' : 'white'}
              stroke={theme === 'dark' ? '#444444' : '#000000'}
              strokeWidth="1"
            />
            <text
              x={ageLabelX}
              y={ageLabelY}
              fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
              fontSize="12"
              fontWeight="normal"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, sans-serif"
            >
              {ageLabelValue}
            </text>
          </g>
        );
      } else {
        const energyLabelRadius = ageRingRadius + 42;
        const energyLabelX = centerX + energyLabelRadius * Math.cos(angleRad);
        const energyLabelY = centerY - energyLabelRadius * Math.sin(angleRad);

        const ageMarkerRadius = ageRingRadius + 22;
        const ageMarkerX = centerX + ageMarkerRadius * Math.cos(angleRad);
        const ageMarkerY = centerY - ageMarkerRadius * Math.sin(angleRad);

        const ageRange = `${formatAgeLabel(age)}-${formatAgeLabel(nextAge)}`;

        ticks.push(
          <g key={`age-${age}`}>
            <circle
              cx={centerX + ageRingRadius * Math.cos(angleRad)}
              cy={centerY - ageRingRadius * Math.sin(angleRad)}
              r="2"
              fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
            />
            <text
              x={ageMarkerX}
              y={ageMarkerY}
              fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
              fontSize="6"
              fontWeight="normal"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, sans-serif"
            >
              {ageRange}
            </text>
            <text
              x={energyLabelX}
              y={energyLabelY}
              fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
              fontSize="10"
              fontWeight="normal"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, sans-serif"
            >
              {energy}
            </text>
          </g>
        );
      }
    }
    return ticks;
  };

  // Unique ID for clip path to prevent conflicts when multiple diagrams exist
  const uniqueId = React.useId();
  const clipPathId = `matrix-bg-clip-${uniqueId}`;

  return (
    <div ref={containerRef} className="relative w-full max-w-full mx-auto flex justify-center items-center overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg max-w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        {/* Generate styles */}
        {generateStyles()}

        <defs>
          <clipPath id={clipPathId}>
            <circle cx={centerX} cy={centerY} r={ageRingRadius} />
          </clipPath>
        </defs>

        {/* Background Image */}
        <polygon
          points={`${centerX},${centerY - innerSquareRadius} ${centerX + innerSquareRadius},${centerY} ${centerX},${centerY + innerSquareRadius} ${centerX - innerSquareRadius},${centerY}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />

        {/* Diagonal square */}
        <polygon
          points={`${centerX - innerSquareHalf},${centerY - innerSquareHalf} ${centerX + innerSquareHalf},${centerY - innerSquareHalf} ${centerX + innerSquareHalf},${centerY + innerSquareHalf} ${centerX - innerSquareHalf},${centerY + innerSquareHalf}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />

        {/* Axis lines */}
        <line x1={centerX} y1={nodePositions.mainTalent.y} x2={centerX} y2={nodePositions.mainProcessing.y} stroke={strokeColor} strokeWidth="1" />
        <line x1={nodePositions.resourceZone.x} y1={centerY} x2={nodePositions.soulTask.x} y2={centerY} stroke={strokeColor} strokeWidth="1" />

        {/* Diagonal lines */}
        <line x1={nodePositions.maleLineage1.x} y1={nodePositions.maleLineage1.y} x2={nodePositions.maleLineage2.x} y2={nodePositions.maleLineage2.y} stroke={strokeColor} strokeWidth="1" />
        <line x1={nodePositions.femaleLineage1.x} y1={nodePositions.femaleLineage1.y} x2={nodePositions.femaleLineage2.x} y2={nodePositions.femaleLineage2.y} stroke={strokeColor} strokeWidth="1" />

        {/* Interconnecting lines */}
        <g stroke={strokeColor} strokeWidth="1">
          <line x1={nodePositions.soulComfortZone.x} y1={nodePositions.soulComfortZone.y} x2={nodePositions.maleLineage1.x} y2={nodePositions.maleLineage1.y} />
          <line x1={nodePositions.soulComfortZone.x} y1={nodePositions.soulComfortZone.y} x2={nodePositions.femaleLineage1.x} y2={nodePositions.femaleLineage1.y} />
          <line x1={nodePositions.soulComfortZone.x} y1={nodePositions.soulComfortZone.y} x2={nodePositions.femaleLineage2.x} y2={nodePositions.femaleLineage2.y} />
          <line x1={nodePositions.soulComfortZone.x} y1={nodePositions.soulComfortZone.y} x2={nodePositions.maleLineage2.x} y2={nodePositions.maleLineage2.y} />
        </g>

        {/* Prosperity line */}
        <line
          x1={intermediateNodes.bottomMid1.x}
          y1={intermediateNodes.bottomMid1.y}
          x2={intermediateNodes.rightMid1.x}
          y2={intermediateNodes.rightMid1.y}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />

        {/* Money Symbol (Inner side of x2) */}
        <g transform={`translate(${prosperityLineNodes.x2.x - 25}, ${prosperityLineNodes.x2.y - 25})`}>
          <text x="0" y="0" fontSize="18" textAnchor="middle" dominantBaseline="central" fill={'green'} fontWeight="bold">$</text>
        </g>

        {/* Heart Symbol (Inner side of x1) */}
        <g transform={`translate(${prosperityLineNodes.x1.x - 32}, ${prosperityLineNodes.x1.y - 32})`}>
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={'red'}
            transform="scale(0.9)"
          />
        </g>

        {/* RENDER ALL NODES */}

        {/* Center node (e) */}
        {renderNode(nodePositions.soulComfortZone.x, nodePositions.soulComfortZone.y, centerNodeRadius, matrix.e, 32, 'e')}

        {/* Top node (b) */}
        {renderNode(nodePositions.mainTalent.x, nodePositions.mainTalent.y, primaryNodeRadius, matrix.b, 28, 'b')}

        {/* Right node (c) */}
        {renderNode(nodePositions.soulTask.x, nodePositions.soulTask.y, primaryNodeRadius, matrix.c, 28, 'c')}

        {/* Left node (a) */}
        {renderNode(nodePositions.resourceZone.x, nodePositions.resourceZone.y, primaryNodeRadius, matrix.a, 28, 'a')}

        {/* Bottom node (d) */}
        {renderNode(nodePositions.mainProcessing.x, nodePositions.mainProcessing.y, primaryNodeRadius, matrix.d, 28, 'd')}

        {/* Corner nodes */}
        {renderNode(nodePositions.maleLineage1.x, nodePositions.maleLineage1.y, primaryNodeRadius, matrix.f, 24, 'f')}
        {renderNode(nodePositions.femaleLineage1.x, nodePositions.femaleLineage1.y, primaryNodeRadius, matrix.g, 24, 'g')}
        {renderNode(nodePositions.femaleLineage2.x, nodePositions.femaleLineage2.y, primaryNodeRadius, matrix.k, 24, 'k')}
        {renderNode(nodePositions.maleLineage2.x, nodePositions.maleLineage2.y, primaryNodeRadius, matrix.y, 24, 'y')}

        {/* DIAGONAL NODES (Mid 1 = Inner/0.707, Mid 2 = Outer/0.854) */}
        {!isCompatibility && (
          <>
            {renderNode(intermediateNodes.topLeftMid1.x, intermediateNodes.topLeftMid1.y, smallNodeRadius, matrix.s1, 14, 's1')}
            {renderNode(intermediateNodes.topRightMid1.x, intermediateNodes.topRightMid1.y, smallNodeRadius, matrix.p1, 14, 'p1')}
            {renderNode(intermediateNodes.bottomLeftMid1.x, intermediateNodes.bottomLeftMid1.y, smallNodeRadius, matrix.p3, 14, 'p3')}
            {renderNode(intermediateNodes.bottomRightMid1.x, intermediateNodes.bottomRightMid1.y, smallNodeRadius, matrix.s4, 14, 's4')}

            {renderNode(intermediateNodes.topLeftMid2.x, intermediateNodes.topLeftMid2.y, secondaryNodeRadius, matrix.s2, 18, 's2')}
            {renderNode(intermediateNodes.topRightMid2.x, intermediateNodes.topRightMid2.y, secondaryNodeRadius, matrix.p2, 18, 'p2')}
            {renderNode(intermediateNodes.bottomLeftMid2.x, intermediateNodes.bottomLeftMid2.y, secondaryNodeRadius, matrix.p4, 18, 'p4')}
            {renderNode(intermediateNodes.bottomRightMid2.x, intermediateNodes.bottomRightMid2.y, secondaryNodeRadius, matrix.s3, 18, 's3')}
          </>
        )}

        {/* Intermediate Axis Nodes (Mid 1 = Inner/0.707, Mid 2 = Outer/0.854) */}
        {renderNode(intermediateNodes.topMid1.x, intermediateNodes.topMid1.y, smallNodeRadius, matrix.b1, 14, 'b1')}
        {renderNode(intermediateNodes.topMid2.x, intermediateNodes.topMid2.y, secondaryNodeRadius, matrix.b2, 18, 'b2')}
        {renderNode(intermediateNodes.bottomMid1.x, intermediateNodes.bottomMid1.y, smallNodeRadius, matrix.d1, 14, 'd1')}
        {renderNode(intermediateNodes.bottomMid2.x, intermediateNodes.bottomMid2.y, secondaryNodeRadius, matrix.d2, 18, 'd2')}
        {renderNode(intermediateNodes.leftMid1.x, intermediateNodes.leftMid1.y, smallNodeRadius, matrix.a1, 14, 'a1')}
        {renderNode(intermediateNodes.leftMid2.x, intermediateNodes.leftMid2.y, secondaryNodeRadius, matrix.a2, 18, 'a2')}
        {renderNode(intermediateNodes.rightMid1.x, intermediateNodes.rightMid1.y, smallNodeRadius, matrix.c1, 14, 'c1')}
        {renderNode(intermediateNodes.rightMid2.x, intermediateNodes.rightMid2.y, secondaryNodeRadius, matrix.c2, 18, 'c2')}


        {/* NEW INNER NODES (b3, a3, e1, e2) */}
        {!isCompatibility && (
          <>
            {renderNode(intermediateNodes.topInner.x, intermediateNodes.topInner.y, tinyNodeRadius, matrix.b3, 12, 'b3')}
            {renderNode(intermediateNodes.leftInner.x, intermediateNodes.leftInner.y, tinyNodeRadius, matrix.a3, 12, 'a3')}
            {renderNode(intermediateNodes.rightInner1.x, intermediateNodes.rightInner1.y, secondaryNodeRadius, matrix.e1, 18, 'e1')}
            {renderNode(intermediateNodes.rightInner2.x, intermediateNodes.rightInner2.y, smallNodeRadius, matrix.e2, 14, 'e2')}
          </>
        )}


        {/* Prosperity line nodes */}
        {renderNode(prosperityLineNodes.x1.x, prosperityLineNodes.x1.y, smallNodeRadius, matrix.x1, 14, 'x1')}
        {renderNode(prosperityLineNodes.x.x, prosperityLineNodes.x.y, smallNodeRadius, matrix.x, 14, 'x')}
        {renderNode(prosperityLineNodes.x2.x, prosperityLineNodes.x2.y, smallNodeRadius, matrix.x2, 14, 'x2')}

        {/* Age ring */}
        {showAgeRing && (
          <g>
            <circle
              cx={centerX}
              cy={centerY}
              r={ageRingRadius}
              fill="none"
              stroke={theme === 'dark' ? '#FFFFFF' : '#000000'}
              strokeWidth="2"
              opacity="0.6"
            />
            {generateAgeRingTicks()}
          </g>
        )}

      </svg>
    </div>
  );
};