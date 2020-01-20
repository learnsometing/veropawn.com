import getPhotosOfItem from "../getPhotosOfItem";
import { allPhotoNodes, defaultPhoto } from "../../__fixtures__/all-photos";

describe('getPhotosOfItem', () => {
  it('should get a single photo', () => {
    const expected = [{
      "name": "G-235089-1_a",
      "childImageSharp": {
        "fluid": {
          "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABAAD/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAL/2gAMAwEAAhADEAAAAdRIYEt6n//EABoQAQEAAgMAAAAAAAAAAAAAAAECABIDECH/2gAIAQEAAQUCt1zdrCfOaVQmev/EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABsQAAEEAwAAAAAAAAAAAAAAAAABAhAiITFh/9oACAEBAAY/AtFUMnCrY//EABoQAQADAAMAAAAAAAAAAAAAAAEAESExcYH/2gAIAQEAAT8hPl6uCNWMilMLoX2gOBkan//aAAwDAQACAAMAAAAQL8//xAAUEQEAAAAAAAAAAAAAAAAAAAAQ/9oACAEDAQE/ED//xAAWEQADAAAAAAAAAAAAAAAAAAABEBH/2gAIAQIBAT8QhX//xAAaEAEAAwEBAQAAAAAAAAAAAAABABEhMZHh/9oACAEBAAE/ECXWzMDydQ7Q83yLWTp2otFACgbeweJYV1Yg/J//2Q==",
          "sizes": "(max-width: 1024px) 100vw, 1024px",
          "srcSet": "/static/30e99e896965d4f526d63f376513f9cd/037d8/G-235089-1_a.jpg 256w,\n/static/30e99e896965d4f526d63f376513f9cd/822dd/G-235089-1_a.jpg 512w,\n/static/30e99e896965d4f526d63f376513f9cd/e9826/G-235089-1_a.jpg 1024w,\n/static/30e99e896965d4f526d63f376513f9cd/466aa/G-235089-1_a.jpg 1536w,\n/static/30e99e896965d4f526d63f376513f9cd/0f962/G-235089-1_a.jpg 2048w,\n/static/30e99e896965d4f526d63f376513f9cd/de7d7/G-235089-1_a.jpg 4000w",
          "src": "/static/30e99e896965d4f526d63f376513f9cd/e9826/G-235089-1_a.jpg",
          "aspectRatio": 1.3333333333333333
        }
      },
      "id": "89e623a8-f614-57a9-ba8b-cccc57658105"
    }];

    expect(getPhotosOfItem(defaultPhoto, allPhotoNodes, "G-235089-1")).toEqual(expected);
  });

  it('should get multiple photos of the same item', () => {
    const expected = [{
      "name": "G-31149-1_a",
      "childImageSharp": {
        "fluid": {
          "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAD/xAAVAQEBAAAAAAAAAAAAAAAAAAABAP/aAAwDAQACEAMQAAABjMUwJMn/xAAbEAACAgMBAAAAAAAAAAAAAAABAgADEiEiMf/aAAgBAQABBQK0qs2TjLKmZ+RD7//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAAQAiEREjH/2gAIAQEABj8CxZxbFRX/xAAaEAEAAgMBAAAAAAAAAAAAAAABABEQIVFB/9oACAEBAAE/IVVFq8IGjpjQSVycTB//2gAMAwEAAgADAAAAEHQ//8QAFhEAAwAAAAAAAAAAAAAAAAAAARAR/9oACAEDAQE/EBF//8QAFhEAAwAAAAAAAAAAAAAAAAAAARAR/9oACAECAQE/EDV//8QAGhABAAMBAQEAAAAAAAAAAAAAAQARITFBcf/aAAgBAQABPxDoWHQZpNvjVQuWwetks0h7KHP92O0uXP/Z",
          "sizes": "(max-width: 1024px) 100vw, 1024px",
          "srcSet": "/static/2802d5b7081a6cdf53d04b1c25a89528/037d8/G-31149-1_a.jpg 256w,\n/static/2802d5b7081a6cdf53d04b1c25a89528/822dd/G-31149-1_a.jpg 512w,\n/static/2802d5b7081a6cdf53d04b1c25a89528/e9826/G-31149-1_a.jpg 1024w,\n/static/2802d5b7081a6cdf53d04b1c25a89528/466aa/G-31149-1_a.jpg 1536w,\n/static/2802d5b7081a6cdf53d04b1c25a89528/0f962/G-31149-1_a.jpg 2048w,\n/static/2802d5b7081a6cdf53d04b1c25a89528/de7d7/G-31149-1_a.jpg 4000w",
          "src": "/static/2802d5b7081a6cdf53d04b1c25a89528/e9826/G-31149-1_a.jpg",
          "aspectRatio": 1.3333333333333333
        }
      },
      "id": "41bb9bf4-f5f8-5af5-9aca-c42d7c130f18"
    },
    {
      "name": "G-31149-1_b",
      "childImageSharp": {
        "fluid": {
          "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEAv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/aAAwDAQACEAMQAAABymmwmGmp/8QAGxAAAgIDAQAAAAAAAAAAAAAAAQIDEwAQESH/2gAIAQEAAQUCmcqVubAvlRM3df/EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAEQABESITH/2gAIAQEABj8CW+zIkU//xAAcEAADAAEFAAAAAAAAAAAAAAAAAREhMVFhgZH/2gAIAQEAAT8he0uoyrGnJhXdxAcVYNZMeFR//9oADAMBAAIAAwAAABA8H//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8QP//EABURAQEAAAAAAAAAAAAAAAAAAAAh/9oACAECAQE/EKj/xAAZEAEBAQEBAQAAAAAAAAAAAAABEQBRIWH/2gAIAQEAAT8QvkNAdslLg8aDMHCI9ZAdsob8NZAR5GSfXf/Z",
          "sizes": "(max-width: 1024px) 100vw, 1024px",
          "srcSet": "/static/4a1b9bbbf1b955fd766c70e6ed431bf8/037d8/G-31149-1_b.jpg 256w,\n/static/4a1b9bbbf1b955fd766c70e6ed431bf8/822dd/G-31149-1_b.jpg 512w,\n/static/4a1b9bbbf1b955fd766c70e6ed431bf8/e9826/G-31149-1_b.jpg 1024w,\n/static/4a1b9bbbf1b955fd766c70e6ed431bf8/466aa/G-31149-1_b.jpg 1536w,\n/static/4a1b9bbbf1b955fd766c70e6ed431bf8/0f962/G-31149-1_b.jpg 2048w,\n/static/4a1b9bbbf1b955fd766c70e6ed431bf8/de7d7/G-31149-1_b.jpg 4000w",
          "src": "/static/4a1b9bbbf1b955fd766c70e6ed431bf8/e9826/G-31149-1_b.jpg",
          "aspectRatio": 1.3333333333333333
        }
      },
      "id": "10312e61-a3c7-52ec-b76f-1eeba11a95f7"
    },
    {
      "name": "G-31149-1_c",
      "childImageSharp": {
        "fluid": {
          "base64": "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQBAwX/xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/2gAMAwEAAhADEAAAAZU0GWULzR//xAAaEAACAwEBAAAAAAAAAAAAAAAAAgMSIgEQ/9oACAEBAAEFApcnGcqPFdsr5//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABoQAAICAwAAAAAAAAAAAAAAAAAQAREhMaH/2gAIAQEABj8CNcV2Yhf/xAAaEAEAAgMBAAAAAAAAAAAAAAABETEAECFB/9oACAEBAAE/IU0YxdJmtAkufTI1/wD/2gAMAwEAAgADAAAAEDMv/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxA//8QAFhEBAQEAAAAAAAAAAAAAAAAAEQEQ/9oACAECAQE/EKuf/8QAGxABAQADAAMAAAAAAAAAAAAAAREAITFBYfD/2gAIAQEAAT8QcAlLJ3EJpNsfaw12YxIaEPHrA0PkvMe5/9k=",
          "sizes": "(max-width: 1024px) 100vw, 1024px",
          "srcSet": "/static/13923011aa62c26a9584d4232154538f/037d8/G-31149-1_c.jpg 256w,\n/static/13923011aa62c26a9584d4232154538f/822dd/G-31149-1_c.jpg 512w,\n/static/13923011aa62c26a9584d4232154538f/e9826/G-31149-1_c.jpg 1024w,\n/static/13923011aa62c26a9584d4232154538f/466aa/G-31149-1_c.jpg 1536w,\n/static/13923011aa62c26a9584d4232154538f/0f962/G-31149-1_c.jpg 2048w,\n/static/13923011aa62c26a9584d4232154538f/de7d7/G-31149-1_c.jpg 4000w",
          "src": "/static/13923011aa62c26a9584d4232154538f/e9826/G-31149-1_c.jpg",
          "aspectRatio": 1.3333333333333333
        }
      },
      "id": "7ec0976c-d381-58c1-abec-05773ea72cae"
    }];
    expect(getPhotosOfItem(defaultPhoto, allPhotoNodes, "G-31149-1")).toEqual(expected);
  });

  it('should return the default photo if no photos of the item are present', () => {
    expect(getPhotosOfItem(defaultPhoto, allPhotoNodes, 'I-123')).toEqual([defaultPhoto]);
  })
});