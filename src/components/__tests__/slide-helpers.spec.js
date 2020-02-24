import { createContentFromSharp, createContentFromMarkdown } from '../../helpers/slides';
import { mainPhotos } from '../../templates/__fixtures__/all-photos';

describe('createContentFromSharp', () => {
  var alt = 'photo';
  var photo = mainPhotos[0];

  it('should return an object with alt, id', () => {
    let expected = [{
      alt: 'photo 1',
      id: photo.id,
      photo: photo.childImageSharp,
    }];

    expect(createContentFromSharp(alt, photo)).toStrictEqual(expected);
  });

  it('should return an empty array if the photo node has no id or childImageSharp properties', () => {
    photo = 'foo';

    expect(createContentFromSharp(alt, photo)).toStrictEqual([]);
  });
});

describe('createContentFromMarkdown', () => {
  it('should return null if node has no frontmatter', () => {
    let node = {}
    expect(createContentFromMarkdown(node)).toStrictEqual([]);
  });

  it('should return null if node has no featuredImage', () => {
    let node = { frontmatter: {} }
    expect(createContentFromMarkdown(node)).toStrictEqual([]);
  });

  it('should set alt to the name of the featuredImage', () => {
    let node = {
      frontmatter: {
        featuredImage: {
          name: 'foo',
        }
      }
    };

    let expected = [{
      alt: 'foo',
      id: undefined,
      linkText: undefined,
      photo: undefined,
      text: undefined,
      title: undefined,
      to: undefined,
    }];

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

    let expected = [{
      alt: 'foo',
      id: '123',
      linkText: undefined,
      photo: undefined,
      text: undefined,
      title: undefined,
      to: undefined,
    }];

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

    let expected = [{
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: undefined,
      text: undefined,
      title: undefined,
      to: '/foo/bar'
    }];

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

    let expected = [{
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: undefined,
      text: 'click me',
      title: undefined,
      to: '/foo/bar'
    }];

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

    let expected = [{
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: undefined,
      text: 'click me',
      title: 'welcome',
      to: '/foo/bar'
    }];

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

    let expected = [{
      alt: 'foo',
      id: '123',
      linkText: 'bar',
      photo: { foo: 'bar' },
      text: 'click me',
      title: 'welcome',
      to: '/foo/bar'
    }];

    expect(createContentFromMarkdown(node)).toStrictEqual(expected);
  });
});