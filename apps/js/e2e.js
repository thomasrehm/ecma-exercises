var e2e = (function (win) {
	var win = window,
		doc = win.document,
		alphabet = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿ";
	gespeicherte_strings = {};

	form_werte_init = {}; //z.B.{ my_num: 4711, my_cb: false, pw: "inp...", ta0: "ta...." };
	function get_store_str(key) {
		return gespeicherte_strings[key];
	}

	function set_store_str(key, val) {
		gespeicherte_strings[key] = val;
	}
	set_store_str("char_von_1_bis_255", "%21%22%23%24%25%26%27%28%29*+%2C-./0123456789%3A%3B%3C%3D%3E%3F@ABCDEFGHIJKLMNOPQRSTUVWXYZ%5B%5C%5D%5E_%60abcdefghijklmnopqrstuvwxyz%7B%7C%7D%7E%7F%80%81%82%83%84%85%86%87%88%89%8A%8B%8C%8D%8E%8F%90%91%92%93%94%95%96%97%98%99%9A%9B%9C%9D%9E%9F%A0%A1%A2%A3%A4%A5%A6%A7%A8%A9%AA%AB%AC%AD%AE%AF%B0%B1%B2%B3%B4%B5%B6%B7%B8%B9%BA%BB%BC%BD%BE%BF%C0%C1%C2%C3%C4%C5%C6%C7%C8%C9%CA%CB%CC%CD%CE%CF%D0%D1%D2%D3%D4%D5%D6%D7%D8%D9%DA%DB%DC%DD%DE%DF%E0%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%EB%EC%ED%EE%EF%F0%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FB%FC%FD%FE%FF");

	set_store_str("lorem-ipsum", "Lorem%20ipsum%20dolor%20sit%20amet%2C%20consectetuer%20adipiscing%20elit.%20Aenean%20commodo%20ligula%20eget%20dolor.%20Aenean%20massa.%20Cum%20sociis%20natoque%20penatibus%20et%20magnis%20dis%20parturient%20montes%2C%20nascetur%20ridiculus%20mus.%0A%0ADonec%20quam%20felis%2C%20ultricies%20nec%2C%20pellentesque%20eu%2C%20pretium%20quis%2C%20sem.%20Nulla%20consequat%20massa%20quis%20enim.%20Donec%20pede%20justo%2C%20fringilla%20vel%2C%20aliquet%20nec%2C%20vulputate%20eget%2C%20arcu.%0A%0AIn%20enim%20justo%2C%20rhoncus%20ut%2C%20imperdiet%20a%2C%20venenatis%20vitae%2C%20justo.%20Nullam%20dictum%20felis%20eu%20pede%20mollis%20pretium.%20Integer%20tincidunt.%20Cras%20dapibus.%20Vivamus%20elementum%20semper%20nisi.%20Aenean%20vulputate%20eleifend%20tellus.%20Aenean%20leo%20ligula%2C%20porttitor%20eu%2C%20consequat%20vitae%2C%20eleifend%20ac%2C%20enim.%20Aliquam%20lorem%20ante%2C%20dapibus%20in%2C%20viverra%20quis%2C%20feugiat%20a.");

	set_store_str("azAZ123öüä", "a%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%20%24%25%26%20/%28%29%20%3D%3F*%20%27%3C%3E%20%23%7C%3B%20%B2%B3%7E%20@%60%B4%20%A9%AB%BB%20%BC%D7%20%7B%7D%20a%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%20%24%25%26%20/%28%29%20%3D%3F*%20%27%3C%3E%20%23%7C%3B%20%B2%B3%7E%20@%60%B4%20%A9%AB%BB%20%BC%D7%20%7B%7D%20a%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%20%24%25%26%20/%28%29%20%3D%3F*%20%27%3C%3E%20%23%7C%3B%20%B2%B3%7E%20@%60%B4%20%A9%AB%BB%20%BC%D7%20%7B%7D%20a%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%20%24%25%26%20/%28%29%20%3D%3F*%20%27%3C%3E%20%23%7C%3B%20%B2%B3%7E%20@%60%B4%20%A9%AB%BB%20%BC%D7%20%7B%7D%20a%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%20%24%25%26%20/%28%29%20%3D%3F*%20%27%3C%3E%20%23%7C%3B%20%B2%B3%7E%20@%60%B4%20%A9%AB%BB%20%BC%D7%20%7B%7D%20a%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%20%24%25%26%20/%28%29%20%3D%3F*%20%27%3C%3E%20%23%7C%3B%20%B2%B3%7E%20@%60%B4%20%A9%AB%BB%20%BC%D7%20%7B%7Da%E4b%20cde%20fgh%20ijk%20lmn%20o%F6p%20qrs%DF%20tu%FC%20vwx%20yz%20A%C4BC%20DEF%20GHI%20JKL%20MNO%20%D6PQ%20RST%20U%DCV%20WXYZ%20%21%22%A7%0A");

	set_store_str("lorem-ipsum-encoded", "E8*kKH%21%5D%3EZ3aS9%3F%22RDFk%3E8ChR8*k%3BE%3AiS%23%5D%21%3BE%3AiJH%22%5DT4FkBkFk%3E8%3FhR_%3F%5DJ%24C%5DT9G%5DSYFk%3E87%5BQI3aS%23%3FaR%5ES%5D%3EZ3%5DR8%5D%21%3DYFk%3E67%5DR%5EGXRYFk%3E8%3FhRH%22hK8%29%5D%3EZ3dQHT%22R86%5D%3EZ3%5DK%23G%21%3BE%3AiK8*dR%24%3Ag%3BE%3AiBHGgKH7g%3BE%3AiRH7nS%236g%3BE%3AiB%24Gf%3BE%3AiS%23*ZQH%5Dn%3BE%3AiR%5E7%21R%247%22KDFk%3E93%5DR%5E7%21QH%3B%22SkFk%3E8G%21%3BE%3AiRH7_R%5E%5Dn%3BE%3AiK8%5Dn%3BE%3AiS87kT9GkQHGgT4Fk%3E8%22hR_C%5DSkFkBkFk%3E8%26XS%23%3F%5DT9Gk%3BE%3AiS%5E%5D%5BQH%3F%22R9Gn%3BE%3AiRIGn%3DYFiBDFiBFChR%5EGZ%3BE%3AiSIGXRDFk%3E8K%5DR8%5Dn%3BE%3B5%3BE%3AiTHj%21S%5E%5DZQHGn%3BE%3AiR%5EGZ%3BE%3B5%3BE%3AiS8GdR8GgT8GnSIG%5D%3BE%3AiKIF%5D%3E%5B%3E%5D%3EZ3iS%5EG%21QIGf%3BE%3AiSIGaSkFkBkFk%3E9%3F%5DRD%25%5D%3EZ3@THjdJDFk%3E8%3FhR_%3F%5DSIGXT4Fk%3E8%22XS%24%3FX%3BE%3AiSIGaSkFk%3E8GgQH%21g%3BE%3AiC8*gKH%3E%5D%3EZ3iKHC%5D%3BE%3AiQ_GnT8%29%5D%3E%5B%3E%5D%3EZ3%5ES%5E%5DgK%23%5DdR86%5D%3EZ3%23KHi%5D%3E%5B%3E%5D%3EZ3XR8%5DjTHG%21%3BE%3AiR%5EGZ%3BE%3B5%3BE%3AiT_GdS9G%21JIC%5D%3BE%3AiKHT%5DT4FkBkFk%3E87kJ%24Fg%3BE33%3BE33DH%25%5D%3EZ3%5DR%5E%5Df%3BE%3AiQ_GnT8%29%5D%3E%5B%3E%5D%3EZ3kQ8*gJ%24Gn%3BE%3AiTIB%5D%3E%5B%3E%5D%3EZ3aRI3%5DS%5ECaKIB%5D%3EZ3X%3BE%3B5%3BE%3AiT%5EGgKH%26XT8%5Dn%3BE%3AiT%5E%5D%21JHF%5D%3E%5B%3E%5D%3EZ3bTI%3F%21Rk%25%5D%3EZ3@THjdJH%21%5D%3EZ3%5BQH%3F%21TH%21%5D%3EZ3%5EKHjaSkFk%3E8G%22%3BE%3AiS8G%5BKDFk%3E8%22hR8jaSkFk%3E93kKICaTH%21g%3BE%3AiDH%26%21KHT%5DSYFk%3E9CaR%5E%3FaK9GgT4%25%5D%3EZ35S%5E7n%3BE%3AiK87iQH%3B%22Sk%25%5D%3EZ3HQIKXRIGn%3BE%3AiKHj%5DRHGgT9Gf%3BE%3AiS%23GfS8Gk%3BE%3AiR%5E%5DnQD%25%5D%3EZ33KH%26%5DJH%25%5D%3EZ3%23THjiTICXT8F%5D%3EZ3%5DR8GaK%5EGgK4Fk%3E9C%5DR8j%22Sk%25%5D%3EZ33KH%26%5DJH%25%5D%3EZ3dKH%29%5D%3EZ3dQHT%22R86%5D%3E%5B%3E%5D%3EZ3iR%24%3B%21T8%5D%21R%24%3A%5D%3EZ3%5DTDFkBkFk%3E8%3FhR_%3F%5DSIGXT4Fk%3E9KaT87%5D%3BE%3B5%3BE%3AiKHj%5DQHK%5DR%5EB%5D%3EZ3XJkFkBkFk%3E8GgQH%21g%3BE%3AiBHjaSIGXRDFk%3E8jhS%5EGf%3BE%3AiJH%26%21KDFkBkFk%3E8CXS8%5DYTI%3E%5D%3EZ3aRYFkBkFk%3E9KaT%5EGkS%5E6%5D%3EZ3jTH%5Dn%3BE%3B5%3BE%3AiK%5EG%22K%23%5DXT4Fk%3E86g");

	set_store_str("char_von_1_bis_255-encoded", "iuG1DV3jJlN+Gm9pZ+8j+QshNJ/VF/VcFsbdR/+zyEz5ZKeS0wsRXqS/yCqykOVXskdGuqR/vHuqvahb9HSiSiJwcG9EWiviQkQU7nLdMYmF4VxovPU68CQmHXYduWZcTYq5G1aPWBYKjd3so4wlz1sdPsyNO8zTQYTpC2S4qobYiJOrDHbkG9KiXhUMu0WSLU3vQ9g3/CSzIR1NBqMAXW32I+ISpd3GMvGgwKRl2kLgsoeZzDAbo/KfPae8RJJHmRo5pw07sLrhL1bKYqW7ja4uLBKiLQZgTT9SfKkwMEtuXqpLqhE/vh5GM1a7JzfL++R8I5fIZipToY1coBvNColL74yP0q7xNaimUyeRFi6H5aa52EhbLC/umfFVuGFYz1XlFxWWS2qZm3DY2nkyWxUFlcYeFetZFwYsE4RoqnOO98Qc3gyrRuY0HehSoAFzhDJvLDZhgrcwHMFRGbdYwA%3D%3D");

	set_store_str("azAZ123öüä-encoded", "NHK%3BC%3C%3EaB_7_O%3CJaB_7bO%23%5BaB_7fUbiaB_7iVL%25aB_7l%3FJN%23W8JoB%3D%3BoWoK%3AG%5EJoB%3DG%22%3FJO9%3FI%3EmXcX%25%3FI%3EmYMdaB_77%3FJB%21F%60BaB_7%3AGJNaB_7%3DH%3A%60aB_7@H%21maB_7CI%60%29aB_6aG9OFJHJoB%3B%3FIK8JoB%3BJaG%3ACL%3FI%3EmK%22%5DOL%5EJoB8JoBHJoB%5EK7CoJoB8JoC8JoCHJoC%5EJoB8%29aB_%5BaB_%60aB_6aB%21FaB%21Ng%3FI%3Em%3FI%3E%24%3FIC9%3FIC%3B%3FI%3Em%3FI%3Ep%3FIX9%3FIC8%3FI%3Em%3FJ%3Eo%3FJ%3Ep%3FIX%3B%3FI%3EmF8J%23B8K8C8JoB8K7DHK7F%5EK8F%5EJoB8K8FoK%3ACoJoB8J%24F%5EJ%24G8JoB%3C%3AaGIG%5E%3FI%3EmN%23Ga%3FI%3EmObXd%3FI%3EmULfh%3FI%3EmV%3C%22k%3FI%3EmVoK%3CCc6aB_7nWcBaG%3ANaB_7%21XHK%3CFoJoB%3DO%24Y8JoB%3Da%27%3FI%3EmFHK9C%3A%3F9%3FI%3EmG%3AK%3C%3FI%3EmG%21%5D%3F%3FI%3EmH%60jB%3FI%3EmIJ%26E%3FI%3Em%3FJF%23J%3B%3AaB_7HJ%22FaB_7K%3FJG9K%5EJoB%3BXNLKdaB_6aB_%3AaB_%3EaFIWaB_6aB_FaB_JaB_NaB_6l%3FI%3E%25%3FI%3E%26%3FI%3Em%3FIC%3A%3FIC%3C@%5EJoB8JoCoJpFoJpGHJoB8JoBoJ%24FoJpF%5EJoB8K8B%5EK8BoJ%24GHJoB%3A6aC_6aF_FaB_6aFI%60aFJ%3EaF%60%3EaB_6aF%60BaG9WaB_6aC%21%3EaC%21FaB_7%5D%3FJJ%21N%5EJoB%3CC%60OHJoB%3COcU8JoB%3CagUoJoB%3CnjV%5EJoB%3C%29aG_Om%3FI%3EmWM%3Fp%3FJG%3C%3FI%3EmX%3DJaG%60BaB_7%23X%24%5BaB_7%26Y%5EJoB%3A%3AaFpG8FoJoB%3AG%3BG%5EJoB%3AX%3EHHJoB%3AfAI8JoB%3A%22DIoJoB8K%3ACa7G%3FI%3EmJaCJ%3FI%3EmKHK%3AF%22NaB_7ML%3BaU%3FI%3Em%3FI%3En%3FI%3Eo%3FJ%3A%24%3FI%3Em%3FI%3E%21%3FI%3E%22%3FI%3E%23%3FI%3EmAoJoD8JoDHJoB8JpG8JpG%5EdaB_6aB_WaB%21BaB%21JaB_6aB_BaC%21BaB%21%3EaB_6aF_%3EaF_BaC%21JaB_76%3FINm%3FJ%3E%21%3FI%3Em%3FJ%3A%26%3FJ%3B8%3FJ%3F8%3FI%3Em%3FJ%3F9%3FJF%24%3FI%3Em%3FIX8%3FIX%3A%3FI%3EmNHK%3BC%3C%3EaB_7_O%3CJaB_7bO%23%5BaB_7fUbiaB_7iVL%25aB_7l%3FJN%23W8JoB%3D%3BoWoK%3AG%5EJoB%3DG%22%3FJO9%3FI%3EmXcX%25%3FI%3EmYMdaB_77%3FJB%21F%60BaB_7%3AGJNaB_7%3DH%3A%60aB_7@H%21maB_7CI%60%29aB_6aG9OFJHJoB%3B%3FIK8JoB%3BJaG%3ACL%3FI%3EmK%22%5DOL%5EJoB8JoBHJoB%5EK7CoJoB8JoC8JoCHJoC%5EJoB8%29aB_%5BaB_%60aB_6aB%21FaB%21Ng%3FI%3Em%3FI%3E%24%3FIC9%3FIC%3B%3FI%3Em%3FI%3Ep%3FIX9%3FIC8%3FI%3Em%3FJ%3Eo%3FJ%3Ep%3FIX%3B%3FI%3EmF8J%23B8K8C8JoB8K7DHK7F%5EK8F%5EJoB8K8FoK%3ACoJoB8J%24F%5EJ%24G8JoB%3C%3AaGIG%5E%3FI%3EmN%23Ga%3FI%3EmObXd%3FI%3EmULfh%3FI%3EmV%3C%22k%3FI%3EmVoK%3CCc6aB_7nWcBaG%3ANaB_7%21XHK%3CFoJoB%3DO%24Y8JoB%3Da%27%3FI%3EmFHK9C%3A%3F9%3FI%3EmG%3AK%3C%3FI%3EmG%21%5D%3F%3FI%3EmH%60jB%3FI%3EmIJ%26E%3FI%3Em%3FJF%23J%3B%3AaB_7HJ%22FaB_7K%3FJG9K%5EJoB%3BXNLKdaB_6aB_%3AaB_%3EaFIWaB_6aB_FaB_JaB_NaB_6l%3FI%3E%25%3FI%3E%26%3FI%3Em%3FIC%3A%3FIC%3C@%5EJoB8JoCoJpFoJpGHJoB8JoBoJ%24FoJpF%5EJoB8K8B%5EK8BoJ%24GHJoB%3A6aC_6aF_FaB_6aFI%60aFJ%3EaF%60%3EaB_6aF%60BaG9WaB_6aC%21%3EaC%21FaB_7%5D%3FJJ%21N%5EJoB%3CC%60OHJoB%3COcU8JoB%3CagUoJoB%3CnjV%5EJoB%3C%29aG_Om%3FI%3EmWM%3Fp%3FJG%3C%3FI%3EmX%3DJaG%60BaB_7%23X%24%5BaB_7%26Y%5EJoB%3A%3AaFpG8FoJoB%3AG%3BG%5EJoB%3AX%3EHHJoB%3AfAI8JoB%3A%22DIoJoB8K%3ACa7G%3FI%3EmJaCJ%3FI%3EmKHK%3AF%22NaB_7ML%3BaU%3FI%3Em%3FI%3En%3FI%3Eo%3FJ%3A%24%3FI%3Em%3FI%3E%21%3FI%3E%22%3FI%3E%23%3FI%3EmAoJoD8JoDHJoB8JpG8JpG%5EdaB_6aB_WaB%21BaB%21JaB_6aB_BaC%21BaB%21%3EaB_6aF_%3EaF_BaC%21JaB_76%3FINm%3FJ%3E%21%3FI%3Em%3FJ%3A%26%3FJ%3B8%3FJ%3F8%3FI%3Em%3FJ%3F9%3FJF%24%3FI%3Em%3FIX8%3FIX%3ANHK%3BC%3C%3EaB_7_O%3CJaB_7bO%23%5BaB_7fUbiaB_7iVL%25aB_7l%3FJN%23W8JoB%3D%3BoWoK%3AG%5EJoB%3DG%22%3FJO9%3FI%3EmXcX%25%3FI%3EmYMdaB_77%3FJB%21F%60BaB_7%3AGJNaB_7%3DH%3A%60aB_7@H%21maB_7CI%60%29aB_6aG9OFJHJoB%3B%3FIK8JoB%3BJaG%3ACL%3FI%3EmK%22%5DOL%5EJoB8JoBHJoB%5EK7CoJmFF..");

	set_store_str("beispiel_bachmann", "%3Cp%3E%20%0AECMAScript%20hat%20eingebaute%20Stringfunktionen%2C%20%0Adie%20f%FCr%20Kryptographie-Algorithen%20verwendet%20werden%20k%F6nnen.%0AZur%20%DCbertragung%20mit%20dem%20HTTP-GET-Protokoll%20gibt%20es%20z.B.%0A%3Cem%3Eescape%28%29%3C/em%3E%2C%20die%20in%20der%20Art%20%3Cem%3Eurl%3Fsearch%3D%27+escape%28SUCHBEGRIFF%29%3C/em%3E%0Averwendet%20wird.%20%0A%3C/p%3E%0A%0A%3Cp%3E%0ABei%20dem%20UTF-8-Zeichensatz%20kann%20ein%20Zeichen%201%2C2%2C3%2C4%20Byte%20haben.%0A%0A%3Cem%3Estr.length%3C/em%3E%20liefert%20die%20Anzahl%20von%20Zeichen.%0ASetzen%20sie%20bitte%20an%20den%20Stellen%20%22anz%20%3D___%22%20die%20Anzahl%20der%20Zeichen%20ein%2C%0Adie%20die%20Funktionen%20liefern.%0A%3C/p%3E%0A%3Cp%3E%0AAchtung%21%20%0A%3Cem%3Eutf8_encode%28%29%3C/em%3E%2C%20%0A%3Cem%3Eutf8_decode%28%29%3C/em%3E%2C%0A%3Cem%3Ebase64_encode%28%29%3C/em%3E%2C%20%0A%3Cem%3Ebase64_decode%28%29%3C/em%3E%20%0Asind%20keine%20eingebauten%20Funktionen.%0A%3C/p%3E%0A%3Cp%3E%0AHier%20eine%20Verst%E4ndnisfrage%3A%0A%3C/p%3E%0A%3Cpre%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22%u272A%u272B%u272C%u272D%u272E%u272F%u2730%22.length%20hat%20anz%20%3D%207%20Zeichen%20%0AencodeURIComponent%28%22%u272A%u272B%u272C%u272D%u272E%u272F%u2730%22%29%20%20%20liefert%20anz%20%3D___%20Zeichen%3A%20%20%22%25E2%259C%25AA%25E2%259C%25AB%25E2%259C%25AC%25E2%259C%25AD%25E2%259C%25AE%25E2%259C%25AF%25E2%259C%25B0%22%0A%20%20%20%20%20%20%20%20%20%20%20%20escape%28%22%u272A%u272B%u272C%u272D%u272E%u272F%u2730%22%29%20%20%20liefert%20anz%20%3D___%20Zeichen%3A%20%20%22%25u272A%25u272B%25u272C%25u272D%25u272E%25u272F%25u2730%22%0A%20%20%20%20%20%20%20utf8_encode%28%22%u272A%u272B%u272C%u272D%u272E%u272F%u2730%22%29%20%20%20liefert%20anz%20%3D___%20Zeichen%3A%20%20%22%E2%9C%AA%E2%9C%AB%E2%9C%AC%E2%9C%AD%E2%9C%AE%E2%9C%AF%E2%9C%B0%22%0A%0AWegen%20der%20Ger%E4teunabh%E4ngigkeit%20von%20%3Cem%3Ebase64%3C/em%3E%20kann%20g%FCnstig%20sein%3A%20%20%0Aencode_bas64%28utf8_encode%28%22%u272A%u272B%u272C%u272D%u272E%u272F%u2730%22%29%29%20liefert%20anz%20%3D%20___%20Zeichen%20%224pyq4pyr4pys4pyt4pyu4pyv4pyw%22%0Autf8_decode%28decode_bas64%28%224pyq4pyr4pys4pyt4pyu4pyv4pyw%22%29%29%20liefert%20%22%u272A%u272B%u272C%u272D%u272E%u272F%u2730%22%0A%3C/pre%3E%20%0A%3Cp%3E%207%2063%2042%2021%2028%20%3C/p%3E");

	function get_str_from(id) {
		var str = "",
			node = doc.getElementById(id),
			tn = node.tagName.toLowerCase();
		if (tn === 'input' || tn === 'textarea') {
			str = node.value;
		} else {
			str = node.innerHTML = str;
		}
		return str;
	}

	function set_str_to(id, str) {
		var node = doc.getElementById(id),
			tn = node.tagName.toLowerCase();
		if (tn === 'input' || tn === 'textarea') {
			node.value = str;
		} else {
			node.innerHTML = str;
		}
	}


	// debug-anzeige für Objekte/Arrays/Strings
	// ========================================
	function show(str_oder_obj) {
		var k, keys, so = str_oder_obj,
			r = [];
		if (typeof so === 'object') {
			keys = Object.keys(so);
			for (k = 0; k < keys.length; k += 1) {
				r.push(keys[k] + " (" + (typeof so[keys[k]]) + "):" + so[keys[k]]);
			}
			win.alert(r.join('\n'));
		} else {
			win.alert(so);
		}
	}
	// arbeiten mit Form-Werten
	// ========================
	function get_alle_formwerte() {
		var f = {};
		f.pw = document.getElementById('pw').value;
		f.ta0 = document.getElementById('ta0').value;
		f.ta1 = document.getElementById('ta1').value;
		f.caesar = document.getElementById('caesar').checked || false;
		f.tea = document.getElementById('tea').checked || false;
		return f;
	}

	function set_formwerte(o) {
		var i, el, keys, key;
		o = o || form_werte_init;
		keys = Object.keys(o);
		for (i = 0; i < keys.length; i += 1) {
			key = keys[i];
			el = document.getElementById(key);
			switch (key) {
				case "pw":
					el.value = o[key];
					break;
				case "ta0":
					el.value = o[key];
					break;
				case "ta1":
					el.value = o[key];
					break;
				case "caesar":
					el.checked = o[key];
					break;
				case "tea":
					el.checked = o[key];
					break;
				default:
					show("ERR:set_formwerte(o) mit o=" + o);
					break;
			}
		}
	}
	// Umwandeln von Unicode-Strings
	// =============================
	function byte_chrs_from_utf8_str(utf8) {
		var byte_chrs = '';
		try {
			byte_chrs = win.unescape(encodeURIComponent(utf8));
		} catch (e) {}
		return byte_chrs;
	}

	function utf8_str_from_byte_chrs(byte_chrs) {
		var utf8 = '';
		try {
			utf8 = decodeURIComponent(win.escape(byte_chrs));
		} catch (e) {
			utf8 = '';
		}
		return utf8;
	}

	// Bsp:  hex_chars_from_utf8_str("äöüÄÖÜß") liefert "c3a4c3b6c3bcc384c396c39cc39f"
	function hex_chars_from_utf8_str(utf8) {
		var i, c, byte_chrs = byte_chrs_from_utf8_str(utf8),
			hex_chars = "";
		for (i = 0; i < byte_chrs.length; i += 1) {
			c = byte_chrs.charCodeAt(i).toString(16);
			if (c.length === 2) {
				hex_chars += c;
			} else if (c.length === 1) {
				hex_chars += "0" + c;
			}
		}
		return hex_chars;
	}


	// Bsp:  utf8_str_from_hex_chrs("c3a4c3b6c3bcc384c396c39cc39f") liefert "äöüÄÖÜß"
	function utf8_str_from_hex_chrs(hex_chrs) {
		var byte_chrs = hex_chrs.replace(/([0-9a-f]{2})/g, function (a, c) {
			return String.fromCharCode(parseInt(c, 16));
		});
		return utf8_str_from_byte_chrs(byte_chrs);
	}

	function encrypt_plain(input, password, caesar, tea) {

		if (tea) {
			var value = Tea.strToLongs(input.utf8Encode());
			var key = Tea.strToLongs(password.utf8Encode());


			value = Tea.encode(value, key);

			var output = Tea.longsToStr(value).base64Encode();
		}
		if (caesar) {
			var key = caesarCreateKey(encode_utf8(password));
			var value = encode_utf8(input);
			value = utf8_to_b64(value)
			value = caesarEncode(value, key);
			var output = value;
		}
		return output;
	}

	function encrypt() {
		var f = get_alle_formwerte(),
			input = String(f.ta0),
			password = String(f.pw),
			caesar = Boolean(f.caesar),
			tea = Boolean(f.tea);

		var output = encrypt_plain(input, password, caesar, tea);
		set_str_to('ta1', output);
	}

	function decrypt_plain(input, password, caesar, tea) {
		if (tea) {
			var value = Tea.strToLongs(input.base64Decode()),
				key = Tea.strToLongs(password.utf8Encode());
			value = Tea.decode(value, key);
			var output = Tea.longsToStr(value).utf8Decode();
		}
		if (caesar) {
			var key = caesarCreateKey(encode_utf8(password));
			var value = caesarDecode(input, key);
			value = b64_to_utf8(value);
			value = decode_utf8(value);
			var output = value;
		}
		return output;
	}

	function decrypt() {
		var f = get_alle_formwerte(),
			input = String(f.ta0),
			password = String(f.pw),
			caesar = Boolean(f.caesar),
			tea = Boolean(f.tea);

		var output = decrypt_plain(input, password, caesar, tea);
		set_str_to('ta1', output);
	}

	function caesarCreateKey(password) {

		var alpha = alphabet,
			NUM = 15,
			n = password.length,
			na = alpha.length;

		for (var i = 0; i < n; i++) {
			c = password.charAt(i);
			z = alpha.indexOf(c);
			alpha = alpha.substring(0, z) + alpha.substring(z + 1, na - i);
		}
		key = alpha.substring(na - NUM, na) + password + alpha.substring(0, na - NUM);
		return key;
	}



	function caesarEncode(value, key) {
		var alpha = alphabet,
			c, z, n = value.length,
			output = "";
		for (var i = 0; i < n; i++) {
			c = value.charAt(i);
			z = alpha.indexOf(c);
			x = key.charAt(z);
			output = output + x;
		}
		value = output;
		return value;
	}



	function caesarDecode(value, key) {
		var alpha = alphabet,
			c, z, n = value.length,
			output = "";

		for (var i = 0; i < n; i++) {
			c = value.charAt(i);
			z = key.indexOf(c);
			output = output + alpha.charAt(z);
		}
		value = output;
		return value;
	}

	function utf8_to_b64(str) {
		return btoa(str);
	}

	function b64_to_utf8(str) {
		return atob(str);
	}

	function encode_utf8(s) {
		return escape(s);
	}

	function decode_utf8(s) {
		return unescape(s);
	}


	function my_xhtml_crypt() {
		var html_part1 = "%3C%21DOCTYPE%20html%3E%0A%3Chtml%20lang%3D%22de%22%3E%0A%0A%3Chead%3E%0A%20%20%20%20%3Ctitle%3E%20Passwort%20gesch%FCtzte%20Seite%20%3C/title%3E%0A%20%20%20%20%3Cmeta%20charset%3D%22UTF-8%22%20/%3E%0A%20%20%20%20%3Cscript%20type%3D%22text/javascript%22%20src%3D%22http%3A//homepages-fb.thm.de/trhm17/apps/js/e2e.js%22%3E%3C/script%3E%0A%20%20%20%20%3Cscript%20type%3D%22text/javascript%22%20src%3D%22http%3A//homepages-fb.thm.de/trhm17/apps/js/tea-block.js%22%3E%3C/script%3E%0A%0A%0A%20%20%20%20%3Cstyle%20type%3D%22text/css%22%3E%0A%20%20%20%20%20%20%20%20%23DECRYPT_DIV%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20float%3A%20right%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20color%3A%20%23fff%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20background-color%3A%20%23500%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20padding%3A%200px%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20margin%3A%200px%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20%23GEHEIME_INFOS%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20display%3A%20none%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%3C/style%3E%0A%0A%0A%0A%20%20%20%20%3Cscript%3E%0A%20%20%20%20%20%20%20%20function%20decodiere%28%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%27use%20strict%27%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20var%20output%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20decrypt%20%3D%20document.getElementById%28%22DECRYPT_DIV%22%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20geheim%20%3D%20document.getElementById%28%22GEHEIME_INFOS%22%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20input%20%3D%20String%28unescape%28geheim.innerHTML%29%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20password%20%3D%20String%28document.getElementById%28%22PASSWORT%22%29.value%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20caesar%20%3D%20Boolean%28document.getElementById%28%27caesar%27%29.checked%20%7C%7C%20false%29%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20tea%20%3D%20Boolean%28document.getElementById%28%27tea%27%29.checked%20%7C%7C%20false%29%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20output%20%3D%20e2e.decrypt_plain%28input%2C%20password%2C%20caesar%2C%20tea%29%3B%0A%0A%20%20%20%20%20%20%20%20%20%20%20%20geheim.innerHTML%20%3D%20output%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20geheim.style.display%20%3D%20%22block%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20decrypt.style.display%20%3D%20%22none%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20false%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%3C/script%3E%0A%3C/head%3E%0A%3Cbody%3E%0A%3Cbody%3E%0A%20%20%20%20%3Cdiv%20id%3D%22DECRYPT_DIV%22%3E%0A%20%20%20%20%20%20%20%20%3Cform%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ch1%3E%26nbsp%3BPasswort%20gesch%FCtzte%20Seite%20%26nbsp%3B%3C/h1%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%26nbsp%3BPasswort%3A%20%26nbsp%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22password%22%20id%3D%22PASSWORT%22%20value%3D%22%22%20/%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22radio%22%20id%3D%22caesar%22%20name%3D%22anwendeverfahren%22%20checked%3D%22checked%22%20/%3ECaesar-Cipher%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cinput%20type%3D%22radio%22%20id%3D%22tea%22%20name%3D%22anwendeverfahren%22%20/%3ETiny%20Encryption%20Algorithm%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href%3D%22javascript%3Avoid%280%29%22%20class%3D%22button%22%20onclick%3D%22decodiere%28%29%3B%22%3EShow%20Encrypted%20Website%3C/a%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%0A%20%20%20%20%20%20%20%20%3C/form%3E%0A%20%20%20%20%3C/div%3E%0A%20%20%20%20%3Cdiv%20id%3D%22GEHEIME_INFOS%22%3E";
		//!
		var body2 = "%3C/div%3E%0A%0A%0A%3C/body%3E%0A%0A%3C/html%3E";
		var f = get_alle_formwerte(),
			input = String(f.ta0),
			password = String(f.pw),
			caesar = Boolean(f.caesar),
			tea = Boolean(f.tea);

		value = encrypt_plain(input, password, caesar, tea);
		var result = unescape(html_part1) + escape(value) + unescape(body2);
		set_str_to('ta1', result);
	}



	return {
		show: show,
		get_store_str: get_store_str,
		set_store_str: set_store_str,
		e2e: e2e,
		encrypt: encrypt,
		decrypt: decrypt,
		my_xhtml_crypt: my_xhtml_crypt,
		decrypt_plain: decrypt_plain,
		encrypt_plain: encrypt_plain,

		get_alle_formwerte: get_alle_formwerte,
		set_formwerte: set_formwerte,
		get_str_from: get_str_from,
		set_str_to: set_str_to,

		byte_chrs_from_utf8_str: byte_chrs_from_utf8_str,
		utf8_str_from_byte_chrs: utf8_str_from_byte_chrs,

		hex_chars_from_utf8_str: hex_chars_from_utf8_str,
		utf8_str_from_hex_chrs: utf8_str_from_hex_chrs,
		version: '2015'
	};
}(window)); // ende von welt
