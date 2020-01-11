import { getPhotosOfItem } from "../invPage/inv-page";
import allPhotoNodes from "../__fixtures__/allPhotos";

describe('getPhotosOfItem', () => {
  it('should get a single photo', () => {
    expect(getPhotosOfItem(allPhotoNodes, "I-270").length).toBe(1);
  });

  it('should get multiple photos of the same item', () => {
    expect(getPhotosOfItem(allPhotoNodes, "I-27").length).toBe(3);
  });
});