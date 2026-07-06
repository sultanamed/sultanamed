import type { ComponentType } from 'react';
import type { ArtProps } from './style';

import Lion from './art/lion';
import Duck from './art/duck';
import Apple from './art/apple';
import Fox from './art/fox';
import Camel from './art/camel';
import Horse from './art/horse';
import Lamb from './art/lamb';
import Bear from './art/bear';
import Corn from './art/corn';
import Pomegranate from './art/pomegranate';
import Giraffe from './art/giraffe';
import Fish from './art/fish';
import Sun from './art/sun';
import Seashell from './art/seashell';
import Frog from './art/frog';
import Airplane from './art/airplane';
import Envelope from './art/envelope';
import Grapes from './art/grapes';
import Cloud from './art/cloud';
import Elephant from './art/elephant';
import Moon from './art/moon';
import Book from './art/book';
import Lemon from './art/lemon';
import Banana from './art/banana';
import Star from './art/star';
import Crescent from './art/crescent';
import Rose from './art/rose';
import Hand from './art/hand';
import ShapeCircle from './art/shape-circle';
import ShapeSquare from './art/shape-square';
import ShapeTriangle from './art/shape-triangle';
import ShapeRectangle from './art/shape-rectangle';
import ShapeStar from './art/shape-star';
import ShapeCrescent from './art/shape-crescent';
import ShapeHeart from './art/shape-heart';
import ShapeOval from './art/shape-oval';
import Balloon from './art/balloon';
import Palm from './art/palm';
import IslandAlfabe from './art/island-alfabe';
import IslandSekiller from './art/island-sekiller';
import IslandRakamlar from './art/island-rakamlar';
import IslandKaliplar from './art/island-kaliplar';
import Boat from './art/boat';
import Wave from './art/wave';
import Compass from './art/compass';
import Treasure from './art/treasure';
import Parrot from './art/parrot';
import Turtle from './art/turtle';

export type { ArtProps } from './style';

export const ART = {
  lion: Lion,
  duck: Duck,
  apple: Apple,
  fox: Fox,
  camel: Camel,
  horse: Horse,
  lamb: Lamb,
  bear: Bear,
  corn: Corn,
  pomegranate: Pomegranate,
  giraffe: Giraffe,
  fish: Fish,
  sun: Sun,
  seashell: Seashell,
  frog: Frog,
  airplane: Airplane,
  envelope: Envelope,
  grapes: Grapes,
  cloud: Cloud,
  elephant: Elephant,
  moon: Moon,
  book: Book,
  lemon: Lemon,
  banana: Banana,
  star: Star,
  crescent: Crescent,
  rose: Rose,
  hand: Hand,
  'shape-circle': ShapeCircle,
  'shape-square': ShapeSquare,
  'shape-triangle': ShapeTriangle,
  'shape-rectangle': ShapeRectangle,
  'shape-star': ShapeStar,
  'shape-crescent': ShapeCrescent,
  'shape-heart': ShapeHeart,
  'shape-oval': ShapeOval,
  balloon: Balloon,
  palm: Palm,
  'island-alfabe': IslandAlfabe,
  'island-sekiller': IslandSekiller,
  'island-rakamlar': IslandRakamlar,
  'island-kaliplar': IslandKaliplar,
  boat: Boat,
  wave: Wave,
  compass: Compass,
  treasure: Treasure,
  parrot: Parrot,
  turtle: Turtle,
} satisfies Record<string, ComponentType<ArtProps>>;

export type IllustrationId = keyof typeof ART;
