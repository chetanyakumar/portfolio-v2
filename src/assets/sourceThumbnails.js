import willYouBeGirl from './images/will_you_be_girl.png';
import sorryCart from './images/sorry_cart.png';

export const SOURCE_THUMBNAILS = {
  'proposal-page': willYouBeGirl,
  'modern-animated-portfolio': sorryCart,
};

export function getSourceThumbnail(projectId) {
  return SOURCE_THUMBNAILS[projectId] ?? null;
}
