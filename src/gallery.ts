import { media } from './data';
import inspiration from '../research/inspiration-images.json';

export type GalleryItem = {
  slug: string; title: string; category: string; image: string; alt: string;
  thumbnail?: string; width?: number; height?: number;
  creator?: string; source?: string; license?: string; licenseUrl?: string;
};

export const galleryCategories = ['All', 'Curtains', 'Blinds', 'Wallpaper', 'Upholstery', 'Furniture'];
const originalGallery: GalleryItem[] = [
  {slug:'soft-daylight',title:'Soft daylight',category:'Curtains',image:media.detail,alt:'Layered pale curtains framing a softly lit living room.'},
  {slug:'rich-in-texture',title:'Rich in texture',category:'Furniture',image:'/images/gallery-texture.jpg',alt:'Interior furnishing inspiration from the Curtain Hive collection.'},
  {slug:'room-to-gather',title:'Room to gather',category:'Furniture',image:'/images/gallery-room.jpg',alt:'Living room furniture arranged as a welcoming seating area.'},
  {slug:'a-quiet-pattern',title:'A quiet pattern',category:'Wallpaper',image:media.wallpaper,alt:'Patterned feature-wall inspiration from the Curtain Hive collection.'},
  {slug:'clean-lines',title:'Clean lines',category:'Blinds',image:media.blinds,alt:'Striped window blinds above a grey living-room sofa.'},
  {slug:'softly-sculpted',title:'Softly sculpted',category:'Upholstery',image:media.upholstery,alt:'Rounded cream seating with textured upholstery in a bright room.'},
  {slug:'classic-drapery',title:'Classic drapery',category:'Curtains',image:'/images/curtains-blackout-detail.jpg',alt:'Full-length curtain drapery and layered fabric inspiration.'},
  {slug:'botanical-walls',title:'Botanical walls',category:'Wallpaper',image:'/images/wallpaper-vinyl.jpg',alt:'Botanical wall-covering inspiration from the Curtain Hive collection.'},
];

// Keep the original room URLs and photographs; add the licensed collection.
export const gallery: GalleryItem[] = [...originalGallery, ...inspiration];

export function galleryService(category: string) {
  return ({Curtains:'custom-curtains',Blinds:'motorized-blinds',Wallpaper:'wallpaper-installation',Upholstery:'sofa-fabric-upholstery',Furniture:'custom-furniture'} as Record<string,string>)[category] || '';
}
