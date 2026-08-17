# Matrix of Destiny: Calculation Formulas & Node Mappings

This document provides a comprehensive breakdown of the formulas and logic used in the Matrix of Destiny system. It covers full matrix calculations, compatibility logic, and the mapping of nodes to various biological and spiritual sections.

---

## 1. Core Mathematical Functions

All calculations in the system use the **22-Reduction** rule (Ladini method):
- If a number is greater than 22, its digits are summed until a number between 1 and 22 is reached.
- **Master Numbers:** The system specifically keeps **11** and **22** as they are during most summations to maintain their spiritual significance.
- **Formula:** `reduceTo22(n)`

---

## 2. Personal Matrix Calculation (Full Matrix)

The matrix is built from the **Date of Birth (DOB): Day, Month, Year.**

### Primary Anchor Nodes
| Position | Node Name | Formula | Description |
| :--- | :--- | :--- | :--- |
| **A** | Resource Zone | `reduceTo22(day)` | Birthday energy |
| **B** | Main Talent | `month` | Birth month (1-12) |
| **C** | Soul Task | `reduceTo22(sumDigits(year))` | Digital root of the year |
| **D** | Main Processing | `reduceTo22(A + B + C)` | Bottom point of the matrix |
| **E** | Comfort Zone | `reduceTo22(A + B + C + D)` | The center of the matrix |

### Diagonal & Lineage Nodes
| Position | Node Name | Formula | Description |
| :--- | :--- | :--- | :--- |
| **F** | Male Lineage (Top) | `reduceTo22(A + B)` | Father's side start |
| **Y** | Male Lineage (Bottom)| `reduceTo22(C + D)` | Father's side end |
| **O** | Male Lineage (Sum) | `reduceTo22(F + Y)` | Result of male lineage |
| **G** | Female Lineage (Top) | `reduceTo22(B + C)` | Mother's side start |
| **K** | Female Lineage (Bottom)| `reduceTo22(A + D)` | Mother's side end |
| **U** | Female Lineage (Sum) | `reduceTo22(G + K)` | Result of female lineage |

### Specialized Interaction Nodes
- **A1:** `reduceTo22(A + E)` (Spiritual Lineage)
- **A2:** `reduceTo22(A + A1)` (Ancestral Lessons)
- **D1:** `reduceTo22(D + E)` (Karmic Bridge)
- **D2:** `reduceTo22(D + D1)` (Karmic Base)
- **C1:** `reduceTo22(C + E)` (Prosperity Entrance)
- **X:** `reduceTo22(D1 + C1)` (Prosperity Balance)
- **X1:** `reduceTo22(D1 + X)` (Romantic Core)
- **C2:** `reduceTo22(C + C1)` (Financial Prosperity)
- **X2:** `reduceTo22(X + C1)` (Financial Channel)
- **B1:** `reduceTo22(B + E)` (Self-Manifestation)
- **B2:** `reduceTo22(B + B1)` (Intellect)

---

## 3. Compatibility Matrix Calculation

Compatibility is calculated by merging the matrices of two people (**Person 1** and **Person 2**).

### Anchor Summation
The primary anchors of the compatibility matrix are the sums of the individual's nodes:
- **Comp_A:** `reduceTo22(Matrix1.A + Matrix2.A)`
- **Comp_B:** `reduceTo22(Matrix1.B + Matrix2.B)`
- **Comp_C:** `reduceTo22(Matrix1.C + Matrix2.C)`
- **Comp_D:** `reduceTo22(Matrix1.D + Matrix2.D)`
- **Comp_E:** `reduceTo22(Matrix1.E + Matrix2.E)`

### Diagonal Summation (Avatarium Logic)
To maintain consistency with the Avatarium system, diagonal anchors are also summed directly:
- **Comp_F:** `reduceTo22(Matrix1.F + Matrix2.F)`
- **Comp_G:** `reduceTo22(Matrix1.G + Matrix2.G)`
- **Comp_Y:** `reduceTo22(Matrix1.Y + Matrix2.Y)`
- **Comp_K:** `reduceTo22(Matrix1.K + Matrix2.K)`

*The rest of the compatibility matrix (O, U, X, etc.) is then derived from these summed points using the same formulas as a personal matrix.*

---

## 4. Section & Chart Mappings

### Health Chart (Chakras)
Mapping of nodes to the 7 Chakras, divided into Physiology, Energy, and Balance.

| Chakra | Physiology (Node) | Energy (Node) | Balance (Node) |
| :--- | :--- | :--- | :--- |
| **Sahasrara** (Crown) | A | B | L (A+B) |
| **Ajna** (Third Eye) | A2 | B2 | L1 (A2+B2) |
| **Vishuddha** (Throat)| A1 | B1 | L2 (A1+B1) |
| **Anahata** (Heart) | A3 (A1+E) | B3 (B1+E) | L3 (A3+B3) |
| **Manipura** (Solar) | E | E | L4 (E+E) |
| **Svadhisthana** (Sacral)| C1 | D1 | L5 (C1+D1) |
| **Muladhara** (Root) | C | D | L6 (C+D) |

- **Totals:** Sum of each column reduced to 22.

### Finances
- **Expansion of the channel:** `C1`
- **Financial channel:** `X2`
- **Prosperity energy:** `C2`
- **Blocks to finances:** `C`
- **Balance (Finances & Relationships):** `X`

### Romantic Relationships
- **Relationship Entrance:** `D1`
- **Main Love Energy:** `X1`
- **Relationship Harmony:** `X`
- **Relationship Character:** `E`
- **Soul Essence:** `E1`
- **Relationship Depth:** `E2`

### Parent-Children Relationships
- **Relationship with Parents:** `A`
- **Ancestral Lessons:** `A2`
- **Spiritual Lineage:** `A1`
- **Relationship with Children:** `A`
- **Spiritual Heritage:** `A2`
- **Parental Guidance:** `A1`

### Karma & Purposes
- **Karma from Past Life:** `D` (Main), `D2` (Base), `D1` (Bridge)
- **Life Purposes:** `M` (Personal - to 40), `Z` (Social - 40-60), `S` (Spiritual - 60+)
- **Ancestral Karma:** Male (`F, Y, O`), Female (`G, K, U`) Plus Protection (`E1, E2`)
- **Karmic Programs:** Spiritual (`s1-s4`), Physical (`p1-p4`), Talents (`b1-b2`)

### Identity
- **Who am I:** `E`
- **Strengths:** `B`
- **Intellect:** `B2`
- **Self-Manifestation:** `B1`
- **Weaknesses:** `D`
- **Energy Source:** `A`
- **Life Purpose:** `C`

---

## 5. Energies of the Year (Timeline)

The year table calculates 3 energies for every 1.25-year interval (64 ticks total for 80 years).

1. **Energy 1 (Main):** Midpoint summation of Primary Anchors (`A, F, B, G, C, Y, D, K`).
2. **Energy 2 (Problem):** Midpoint summation of Problem Anchors (`C, Y, D, K` repeated).
3. **Energy 3 (Reward):** `reduceTo22(Energy 1 + Energy 2)`.

*Calculated recursively: `Anchor A + Anchor B = Midpoint`.*
