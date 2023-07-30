import React from "react";
import hebrewc from "../../assets/hebrewc.gif";
import nikud from "../../assets/nikud.gif";
import dagesh from "../../assets/dagesh.gif";

export default function Reading(props) {
  return (
    <div className="main-page">
      <div className="alefbet">
        <h1>Hebrew Alefbet</h1>
        <div className="paragraph-image">
          <p>
            The Hebrew alefbet consists of 22 letters, which are all
            consonants.The final forms, also known as Sofit forms, are
            alternative forms of five Hebrew letters: Kaf, Mem, Nun, Peh, and
            Tsadeh. These special forms are used exclusively when these letters
            appear at the end of a word. In all other positions within a word,
            the regular forms of these letters are used. Unlike the English
            alphabet, Hebrew is written from right to left. Let's go through
            each letter along with its pronunciation and transliteration (how
            it's written in English):
          </p>
          <img className="letter-chart" src={hebrewc} alt="hebrewc" />
        </div>
        <ul>
          <li>
            <strong>א (Aleph)</strong> - Pronounced like a glottal stop, similar
            to the "a" in "father." Transliteration: ' (e.g., בַּיִת = bayit)
          </li>
          <li>
            <strong>ב (Bet)</strong> - Pronounced like the English "b" sound.
            Transliteration: b (e.g., בַּיִת = bayit)
          </li>
          <li>
            <strong>ג (Gimel)</strong> - Pronounced like the English "g" sound.
            Transliteration: g (e.g., גַּן = gan)
          </li>
          <li>
            <strong>ד (Dalet)</strong> - Pronounced like the English "d" sound.
            Transliteration: d (e.g., דֶּלֶת = delet)
          </li>
          <li>
            <strong>ה (He)</strong> - Pronounced like the English "h" sound.
            Transliteration: h (e.g., הַיָּם = hayam)
          </li>
          <li>
            <strong>ו (Vav)</strong> - Pronounced like the English "v" sound.
            Transliteration: v (e.g., עַבְדּוּת = avdut)
          </li>
          <li>
            <strong>ז (Zayin)</strong> - Pronounced like the English "z" sound.
            Transliteration: z (e.g., זָמַן = zman)
          </li>
          <li>
            <strong>ח (Het)</strong> - Pronounced as a guttural sound, like the
            "ch" in the Scottish "loch" or the German "Bach." Transliteration:
            ch (e.g., חֹמֶר = chomer)
          </li>
          <li>
            <strong>ט (Tet)</strong> - Pronounced like the English "t" sound.
            Transliteration: t (e.g., טַבָּעַת = tabaat)
          </li>
          <li>
            <strong>י (Yod)</strong> - Pronounced like the English "y" sound.
            Transliteration: y (e.g., יָם = yam)
          </li>
          <li>
            <strong>כ (Kaf)</strong> - Pronounced like the English "k" sound
            when it has a dot in the middle (כּ). Transliteration: k (e.g.,
            כֹּחַ = koach). When it has a dot on the left side (ךְ), it is
            pronounced as "kh" (e.g., עַרְבִּי = arbi).
          </li>
          <li>
            <strong>ךּ (Final Kaf)</strong> - Transliteration: k
          </li>
          <li>
            <strong>ל (Lamed)</strong> - Pronounced like the English "l" sound.
            Transliteration: l (e.g., לֵב = lev)
          </li>
          <li>
            <strong>מ (Mem)</strong> - Pronounced like the English "m" sound.
            Transliteration: m (e.g., מָנַע = mana)
          </li>
          <li>
            <strong>ם (Final Mem)</strong> - Transliteration: m
          </li>
          <li>
            <strong>נ (Nun)</strong> - Pronounced like the English "n" sound.
            Transliteration: n (e.g., נֶפֶשׁ = nefesh)
          </li>
          <li>
            <strong>ן (Final Nun)</strong> - Transliteration: n
          </li>
          <li>
            <strong>ס (Samekh)</strong> - Pronounced like the English "s" sound.
            Transliteration: s (e.g., סוּס = sus)
          </li>
          <li>
            <strong>ע (Ayin)</strong> - Pronounced as a guttural sound, with no
            English equivalent. Transliteration: ' (e.g., עַץ = 'etz)
          </li>
          <li>
            <strong>פ (Pe)</strong> - Pronounced like the English "p" sound when
            it has a dot in the middle (פּ). Transliteration: p (e.g., פָּנִים =
            panim). When it has a dot on the left side (ף), it is pronounced as
            "f" (e.g., סוֹף = sof).
          </li>
          <li>
            <strong>ף (Final Pe)</strong> - Transliteration: p
          </li>
          <li>
            <strong>צ (Tsade)</strong> - Pronounced like the English "ts" sound.
            Transliteration: ts (e.g., צֶדֶק = tsedek)
          </li>
          <li>
            <strong>ץ (Final Tsade)</strong> - Transliteration: tz
          </li>
          <li>
            <strong>ק (Qof)</strong> - Pronounced like the English "k" sound but
            further back in the throat. Transliteration: q (e.g., קָטָן = qatan)
          </li>
          <li>
            <strong>ר (Resh)</strong> - Pronounced like the English "r" sound.
            Transliteration: r (e.g., רַע = ra)
          </li>
          <li>
            <strong>ש (Shin/Sin)</strong> - Depending on its position, it can be
            pronounced as "sh" (שׁ) or "s" (שׂ). Transliteration: sh (e.g., שֵׁם
            = shem) / s (e.g., שָׂדֶה = sadeh)
          </li>
          <li>
            <strong>ת (Tav)</strong> - Pronounced like the English "t" sound.
            Transliteration: t (e.g., תַּלְמִיד = talmid)
          </li>
        </ul>
      </div>
      <div className="nikkud">
        <h1>Hebrew Nikkud (Vowel Points)</h1>
        <div className="paragraph-image">
          <p>
            In Hebrew, the vowels are represented by a set of diacritics called
            nikkud. They help indicate the vowel sounds in words, as the alefbet
            only consists of consonants. However, in modern Hebrew writing,
            nikkud is often omitted for most texts, except for children's books,
            religious texts, and language-learning materials.
          </p>
          <img className="nikud-chart" src={nikud} alt="nikud" />
        </div>
        <ul>
          <li>
            <strong>אַ (Patach)</strong> - Represents the "a" sound, as in
            "father." Transliteration: a (e.g., בַּיִת = bayit)
          </li>
          <li>
            <strong>אֲ (Hataf Patach)</strong> - Represents a short "a" sound,
            similar to "cup." Transliteration: a (e.g., פַּנִּים = panim)
          </li>
          <li>
            <strong>אָ (Kamatz)</strong> - Represents the "a" sound, similar to
            "father." Transliteration: a (e.g., בָּיִת = bayit)
          </li>
          <li>
            <strong>אֳ (Kamatz Katan)</strong> - Represents a short "o" sound,
            similar to "cot." Transliteration: o (e.g., כָּתָב = katav)
          </li>
          <li>
            <strong>אֵ (Tzeirei)</strong> - Represents the "ay" sound, as in
            "say." Transliteration: e (e.g., בֵּית = beit)
          </li>
          <li>
            <strong>אֱ (Hataf Segol)</strong> - Represents a short "e" sound.
            Transliteration: e (e.g., חֱפֵץ = chefetz)
          </li>
          <li>
            <strong>אֶ (Segol)</strong> - Represents the "e" sound, as in "bed."
            Transliteration: e (e.g., בֶּלֶט = belet)
          </li>
          <li>
            <strong>אִ (Hirik)</strong> - Represents the "i" sound, as in
            "machine." Transliteration: i (e.g., בִּנְיָמִין = Binyamin)
          </li>
          <li>
            <strong>אֻ (Kubutz)</strong> - Represents the "u" sound, as in
            "put." Transliteration: u (e.g., בֻּקָּר = boker)
          </li>
          <li>
            <strong>אֹ (Cholam)</strong> - Represents the long "o" sound, as in
            "go." Transliteration: o (e.g., בֹּוקֶר = boker)
          </li>
          <li>
            <strong>וֹ (Vav with Cholam)</strong> - Represents the long "o"
            sound, as in "go." Transliteration: o (e.g., בֹּוקֶר = boker)
          </li>
          <li>
            <strong>ָו (Vav with Kamatz)</strong> - Represents the "o" sound, as
            in "go." Transliteration: o (e.g., יָדָיו = yadav)
          </li>
          <li>
            <strong>אֻ (Sh'va)</strong> - Represents a very short, almost
            silent, vowel sound. Transliteration: u (e.g., עֻגָה = ugah)
          </li>
          <li>
            <strong>אֱ֫ (Tzeirei Magga)</strong> - Represents the "eh" sound,
            similar to "bed." Transliteration: e (e.g., עֱגָל = egal)
          </li>
          <li>
            <strong>ִי (Hirik Yud)</strong> - Represents the "ee" sound, as in
            "see." Transliteration: i (e.g., עִיר = ir)
          </li>
          <li>
            <strong>ִי (Hirik Yud)</strong> - Represents the "ee" sound, as in
            "see." Transliteration: i (e.g., עִיר = ir)
          </li>
          <li>
            <strong>ֵי (Tzeirei Yud)</strong> - Represents the "ey" sound, as in
            "they." Transliteration: e (e.g., עֵין = ein)
          </li>
          <li>
            <strong>ָי (Kamatz Yud)</strong> - Represents the "ah-ee" sound, as
            in "bye." Transliteration: a (e.g., עַיִן = ayin)
          </li>
          <li>
            <strong>ַי (Patach Yud)</strong> - Represents the "ah" sound, as in
            "father." Transliteration: a (e.g., עַיִן = ayin)
          </li>
          <li>
            <strong>ֻו (Kubutz Vav)</strong> - Represents the "oo" sound, as in
            "cool." Transliteration: u (e.g., מוּדה = modeh)
          </li>
          <li>
            <strong>ִו (Hirik Vav)</strong> - Represents the "ee" sound, as in
            "see." Transliteration: i (e.g., יִשְׂרָאֵל = Yisrael)
          </li>
          <li>
            <strong>ֵו (Tzeirei Vav)</strong> - Represents the "ey" sound, as in
            "they." Transliteration: e (e.g., עֵין = ein)
          </li>
        </ul>
      </div>
      <div>
        <div className="dagesh">
          <h1>Hebrew Dagesh (Dot inside Bet, Kaf, and Peh)</h1>
          <p>
            The dot that appears in the center of some letters is called a
            dagesh. With most letters, the dagesh does not significantly affect
            pronunciation. With the letters Bet, Kaf and Pe, however, the dagesh
            indicates that the letter should be pronounced with its hard sound
            (the first sound) rather than the soft sound (the second sound).
            Shin is pronounced "sh" when it has a dot over the right branch and
            "s" when it has a dot over the left branch.
          </p>
          <img className="dagesh-chart" src={dagesh} alt="dagesh" />
        </div>
      </div>
    </div>
  );
}
