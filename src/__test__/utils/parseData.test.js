global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
import { parseCategory, findMeasures, parseCoopCategory, parseSelverCategory, reverse} from '../../utils/parseData';

describe('parseData', () => {
    test('finds the correct measure in the input string', () => {
      expect(findMeasures('Verivorst RAKVERE, 500g')).toBe('500g')
      expect(findMeasures('Ahjubroiler kukeseentega TALLEGG, kg')).toBe('kg')
      expect(findMeasures('Piim AASA 2,5%, 2L')).toBe('2000ml')
    });

    test('correctly parses and maps the category name', () => {
      expect(parseCategory('SH-12-abc')).toBe('Köögiviljad, puuviljad')
      expect(parseCategory('SH-11-def')).toBe('Piimatooted ja munad')
      expect(parseCategory('SH-6-ghi')).toBe('Leivad, saiad, kondiitritooted')
      expect(parseCategory('SH-8-jkl')).toBe('Liha, kala, valmistoit')
      expect(parseCategory('SH-16-mno')).toBe('Liha, kala, valmistoit')
      expect(parseCategory('SH-13-pqr')).toBe('Kauasäilivad toidukaubad')
      expect(parseCategory('SH-4-stu')).toBe('Külmutatud tooted')
      expect(parseCategory('SH-9-vwx')).toBe('Kauasäilivad toidukaubad')
      expect(parseCategory('SH-3-yz')).toBe('Joogid')
      expect(parseCategory('SH-1-a')).toBe('Joogid')
      expect(parseCategory('SH-5-bc')).toBe('Lastekaubad')
      expect(parseCategory('SH-2-de')).toBe('Enesehooldustooted')
      expect(parseCategory('SH-10-fgh')).toBe('Kodukaubad ja vaba aeg')
      expect(parseCategory('SH-7-ijk')).toBe('Puhastustarbed ja lemmikloomatooted')
      expect(parseCategory('XY-12-lmn')).toBe('Muu')
    });

    test('parseCoopCategory should return the correct category name', () => {
      expect(parseCoopCategory('1')).toBe('Köögiviljad, puuviljad');
      expect(parseCoopCategory('53')).toBe('Joogid');
      expect(parseCoopCategory('109')).toBe('Puhastustarbed ja lemmikloomatooted');
      expect(parseCoopCategory('unknown')).toBe('Muu');
    });


    test('parseSelverCategory should return the correct category name', () => {
      expect(parseSelverCategory(209)).toBe('Köögiviljad, puuviljad');
      expect(parseSelverCategory(28)).toBe('Joogid');
      expect(parseSelverCategory(306)).toBe('Lastekaubad');
      expect(parseSelverCategory(99)).toBe('Enesehooldustooted');
      expect(parseSelverCategory(500)).toBe('Muu');
    });    

    test('reverse should return the reversed string', () => {
      expect(reverse('hello')).toBe('olleh');
      expect(reverse('world')).toBe('dlrow');
      expect(reverse('javascript')).toBe('tpircsavaj');
      expect(reverse('foo')).toBe('oof');
      expect(reverse('bar')).toBe('rab');
    });
  });