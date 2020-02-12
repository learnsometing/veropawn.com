import { createContentArray, createContentFromMarkdown } from '../../helpers/slides';
import { mainPhotos } from '../../templates/__fixtures__/all-photos';

describe('createContentArray', () => {
  it('should return a content array when photos is an object with id and childImageSharp properties', () => {
    let alt = 'photo';
    let photo = mainPhotos[0];
    let expected = [{
      alt: 'photo 1',
      id: photo.id,
      photo: photo.childImageSharp,
    }];

    expect(createContentArray(alt, photo)).toStrictEqual(expected);
  });

  it('should return an array when given an array of objects with id and childImageSharp properties', () => {
    let alt = 'photo';
    let photos = mainPhotos.slice(0, 2);
    let expected = [
      {
        alt: 'photo 1',
        id: photos[0].id,
        photo: photos[0].childImageSharp,
      },
      {
        alt: 'photo 2',
        id: photos[1].id,
        photo: photos[1].childImageSharp,
      }
    ];

    expect(createContentArray(alt, photos)).toStrictEqual(expected);
  });

  it('should return null if photos is not an array or object', () => {
    let alt = 'photo';
    let photos = 'foo';

    expect(createContentArray(alt, photos)).toStrictEqual(null);
  });

  it('should replace alt with a default string if alt is not a string', () => {
    let alt = {};
    let photos = mainPhotos[0];
    let result = createContentArray(alt, photos);
    expect(result[0].alt).toStrictEqual('Default 1');
  });
});

describe('createContentFromMarkdown', () => {
  it('should return null if node has no frontmatter', () => {
    let node = {}
    expect(createContentFromMarkdown(node)).toStrictEqual(null);
  });

  it('should return null if node has no featuredImage', () => {
    let node = { frontmatter: {} }
    expect(createContentFromMarkdown(node)).toStrictEqual(null);
  });

  it('should set alt to the name of the featuredImage', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          name: 'foo',
        }
      }
    };

    let expected = {
      alt: 'foo',
      id: undefined,
      linkText: undefined,
      photo: undefined,
      text: undefined,
      title: undefined,
      to: undefined,
    };

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });

  it('should set id to the id of the featuredImage', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          id: '123',
          name: 'foo'
        }
      }
    };

    let expected = {
      alt: 'foo',
      id: '123',
      linkText: undefined,
      photo: undefined,
      text: undefined,
      title: undefined,
      to: undefined,
    };

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });

  it('should set linkText and to properly', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          id: '123',
          name: 'foo'
        },
        linkText: 'bar',
        to: '/foo/bar',
      }
    };

    let expected = {
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: undefined,
      text: undefined,
      title: undefined,
      to: '/foo/bar'
    };

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });

  it('should set text to frontmatter.text', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          id: '123',
          name: 'foo'
        },
        linkText: 'bar',
        text: 'click me',
        to: '/foo/bar',
      }
    };

    let expected = {
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: undefined,
      text: 'click me',
      title: undefined,
      to: '/foo/bar'
    };

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });

  it('should set title to frontmatter.title', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          id: '123',
          name: 'foo'
        },
        linkText: 'bar',
        text: 'click me',
        title: 'welcome',
        to: '/foo/bar',
      }
    };

    let expected = {
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: undefined,
      text: 'click me',
      title: 'welcome',
      to: '/foo/bar'
    };

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });

  it('should set photo to frontmatter.featuredImage.childImageSharp', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          childImageSharp: {
            foo: 'bar'
          },
          id: '123',
          name: 'foo'
        },
        linkText: 'bar',
        text: 'click me',
        title: 'welcome',
        to: '/foo/bar',
      }
    };

    let expected = {
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: { foo: 'bar' },
      text: 'click me',
      title: 'welcome',
      to: '/foo/bar'
    };

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });
});