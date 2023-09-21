import React from "react";

export default function Study(props) {
  return (
    <div className="main-page">
      <div className="kana">
        <h1>Japanese Kana</h1>
        <div className="paragraph-image">
          <p>
            Japanese is written with a combination of three different scripts:
            hiragana, katakana, and kanji. Hiragana and katakana are syllabic
            scripts, meaning that each character represents a syllable. Kanji,
            on the other hand, are ideographic characters that represent ideas
            or concepts. Hiragana and katakana are collectively known as kana.
            Hiragana is used for native Japanese words, while katakana is used
            for loanwords and foreign names. For the purposes of this platform,
            we will use hiragana only.
          </p>
          {/* <img className="letter-chart" src={kana} alt="kana" /> */}
        </div>
        <h2>Hiragana</h2>
        <ul>
          <li>
            <strong>あ (A)</strong> - Transliteration: a (e.g., あさ = asa)
          </li>
          <li>
            <strong>え (E)</strong> - Transliteration: e (e.g., えき = eki)
          </li>
          <li>
            <strong>い (I)</strong> - Transliteration: i (e.g., いち = ichi)
          </li>
          <li>
            <strong>お (O)</strong> - Transliteration: o (e.g., おんせん =
            onsen)
          </li>
          <li>
            <strong>う (U)</strong> - Transliteration: u (e.g., うみ = umi)
          </li>
          <li>
            <strong>か (Ka)</strong> - Transliteration: ka (e.g., かさ = kasa)
          </li>
          <li>
            <strong>け (Ke)</strong> - Transliteration: ke (e.g., けいたい =
            keitai)
          </li>
          <li>
            <strong>き (Ki)</strong> - Transliteration: ki (e.g., きょう = kyou)
          </li>
          <li>
            <strong>こ (Ko)</strong> - Transliteration: ko (e.g., こうえん =
            kouen)
          </li>
          <li>
            <strong>く (Ku)</strong> - Transliteration: ku (e.g., くつ = kutsu)
          </li>
          <li>
            <strong>さ (Sa)</strong> - Transliteration: sa (e.g., さかな =
            sakana)
          </li>
          <li>
            <strong>せ (Se)</strong> - Transliteration: se (e.g., せんせい =
            sensei)
          </li>
          <li>
            <strong>し (Shi)</strong> - Transliteration: shi (e.g., しゃしん =
            shashin)
          </li>
          <li>
            <strong>そ (So)</strong> - Transliteration: so (e.g., そら = sora)
          </li>
          <li>
            <strong>す (Su)</strong> - Transliteration: su (e.g., すし = sushi)
          </li>
          <li>
            <strong>た (Ta)</strong> - Transliteration: ta (e.g., たべる =
            taberu)
          </li>
          <li>
            <strong>て (Te)</strong> - Transliteration: te (e.g., てがみ =
            tegami)
          </li>
          <li>
            <strong>ち (Chi)</strong> - Transliteration: chi (e.g., ちがう =
            chigau)
          </li>
          <li>
            <strong>と (To)</strong> - Transliteration: to (e.g., とけい =
            tokei)
          </li>
          <li>
            <strong>つ (Tsu)</strong> - Transliteration: tsu (e.g., つくえ =
            tsukue)
          </li>
          <li>
            <strong>な (Na)</strong> - Transliteration: na (e.g., なまえ =
            namae)
          </li>
          <li>
            <strong>ね (Ne)</strong> - Transliteration: ne (e.g., ねこ = neko)
          </li>
          <li>
            <strong>に (Ni)</strong> - Transliteration: ni (e.g., にほん =
            nihon)
          </li>
          <li>
            <strong>の (No)</strong> - Transliteration: no (e.g., のみもの =
            nomimono)
          </li>
          <li>
            <strong>ぬ (Nu)</strong> - Transliteration: nu (e.g., ぬいぐるみ =
            nuigurumi)
          </li>
          <li>
            <strong>は (Ha)</strong> - Transliteration: ha (e.g., はし = hashi)
          </li>
          <li>
            <strong>へ (He)</strong> - Transliteration: he (e.g., へや = heya)
          </li>
          <li>
            <strong>ひ (Hi)</strong> - Transliteration: hi (e.g., ひるごはん =
            hirugohan)
          </li>
          <li>
            <strong>ほ (Ho)</strong> - Transliteration: ho (e.g., ほん = hon)
          </li>
          <li>
            <strong>ふ (Fu)</strong> - Transliteration: fu (e.g., ふく = fuku)
          </li>
          <li>
            <strong>ま (Ma)</strong> - Transliteration: ma (e.g., まど = mado)
          </li>
          <li>
            <strong>め (Me)</strong> - Transliteration: me (e.g., めがね =
            megane)
          </li>
          <li>
            <strong>み (Mi)</strong> - Transliteration: mi (e.g., みせ = mise)
          </li>
          <li>
            <strong>も (Mo)</strong> - Transliteration: mo (e.g., もの = mono)
          </li>
          <li>
            <strong>む (Mu)</strong> - Transliteration: mu (e.g., むし = mushi)
          </li>
          <li>
            <strong>や (Ya)</strong> - Transliteration: ya (e.g., やさい =
            yasai)
          </li>
          <li>
            <strong>よ (Yo)</strong> - Transliteration: yo (e.g., よる = yoru)
          </li>
          <li>
            <strong>ゆ (Yu)</strong> - Transliteration: yu (e.g., ゆび = yubi)
          </li>
          <li>
            <strong>ら (Ra)</strong> - Transliteration: ra (e.g., らいねん =
            rainen)
          </li>
          <li>
            <strong>れ (Re)</strong> - Transliteration: re (e.g., れいぞうこ =
            reizouko)
          </li>
          <li>
            <strong>り (Ri)</strong> - Transliteration: ri (e.g., りんご =
            ringo)
          </li>
          <li>
            <strong>ろ (Ro)</strong> - Transliteration: ro (e.g., ろうか =
            rouka)
          </li>
          <li>
            <strong>る (Ru)</strong> - Transliteration: ru (e.g., るすばん =
            rusuban)
          </li>
          <li>
            <strong>わ (Wa)</strong> - Transliteration: wa (e.g., わたし =
            watashi)
          </li>
          <li>
            <strong>を (Wo)</strong> - Transliteration: wo or o (e.g., をたべる
            = otaberu)
          </li>
          <li>
            <strong>ん (N)</strong> - Transliteration: n (e.g., にほんご =
            nihongo)
          </li>
          <li>
            <strong>きゃ (Kya)</strong>
          </li>
          <li>
            <strong>きゅ (Kyu)</strong>
          </li>
          <li>
            <strong>きょ (Kyo)</strong>
          </li>
          <li>
            <strong>しゃ (Sha)</strong>
          </li>
          <li>
            <strong>しゅ (Shu)</strong>
          </li>
          <li>
            <strong>しょ (Sho)</strong>
          </li>
          <li>
            <strong>ちゃ (Cha)</strong>
          </li>
          <li>
            <strong>ちゅ (Chu)</strong>
          </li>
          <li>
            <strong>ちょ (Cho)</strong>
          </li>
          <li>
            <strong>にゃ (Nya)</strong>
          </li>
          <li>
            <strong>にゅ (Nyu)</strong>
          </li>
          <li>
            <strong>にょ (Nyo)</strong>
          </li>
          <li>
            <strong>ひゃ (Hya)</strong>
          </li>
          <li>
            <strong>ひゅ (Hyu)</strong>
          </li>
          <li>
            <strong>ひょ (Hyo)</strong>
          </li>
          <li>
            <strong>みゃ (Mya)</strong>
          </li>
          <li>
            <strong>みゅ (Myu)</strong>
          </li>
          <li>
            <strong>みょ (Myo)</strong>
          </li>
          <li>
            <strong>りゃ (Rya)</strong>
          </li>
          <li>
            <strong>りゅ (Ryu)</strong>
          </li>
          <li>
            <strong>りょ (Ryo)</strong>
          </li>
        </ul>
      </div>
      <div>
        <div className="modifiers">
          <h2>Kana Modifiers</h2>
          <p>
            Kana modifiers are used to change the sound of a kana. They are
            written in hiragana and placed after the kana that they modify.
          </p>
          <ul>
            <li>
              <strong>が (Ga)</strong> - Transliteration: ga (e.g., がっこう =
              gakkou)
            </li>
            <li>
              <strong>げ (Ge)</strong> - Transliteration: ge (e.g., げんき =
              genki)
            </li>
            <li>
              <strong>ぎ (Gi)</strong> - Transliteration: gi (e.g., ぎんこう =
              ginkou)
            </li>
            <li>
              <strong>ご (Go)</strong> - Transliteration: go (e.g., ごはん =
              gohan)
            </li>
            <li>
              <strong>ぐ (Gu)</strong> - Transliteration: gu (e.g., ぐん = gun)
            </li>
            <li>
              <strong>ざ (Za)</strong> - Transliteration: za (e.g., ざっし =
              zasshi)
            </li>
            <li>
              <strong>ぜ (Ze)</strong> - Transliteration: ze (e.g., ぜんぶ =
              zenbu)
            </li>
            <li>
              <strong>じ (Ji)</strong> - Transliteration: ji (e.g., じしょ =
              jisho)
            </li>
            <li>
              <strong>ぞ (Zo)</strong> - Transliteration: zo (e.g., ぞう = zou)
            </li>
            <li>
              <strong>ず (Zu)</strong> - Transliteration: zu (e.g., ずつ =
              zutsu)
            </li>
            <li>
              <strong>だ (Da)</strong> - Transliteration: da (e.g., だいがく =
              daigaku)
            </li>
            <li>
              <strong>で (De)</strong> - Transliteration: de (e.g., でんわ =
              denwa)
            </li>
            <li>
              <strong>ぢ (Ji)</strong> - Transliteration: ji (e.g., ぢゃ = ja)
            </li>
            <li>
              <strong>ど (Do)</strong> - Transliteration: do (e.g., どうぶつ =
              doubutsu)
            </li>
            <li>
              <strong>づ (Zu)</strong> - Transliteration: zu (e.g., づつ =
              zutsu)
            </li>
            <li>
              <strong>ば (Ba)</strong> - Transliteration: ba (e.g., ばんごはん =
              bangohan)
            </li>
            <li>
              <strong>べ (Be)</strong> - Transliteration: be (e.g., べんきょう =
              benkyou)
            </li>
            <li>
              <strong>び (Bi)</strong> - Transliteration: bi (e.g., びじゅつかん
              = bijutsukan)
            </li>
            <li>
              <strong>ぼ (Bo)</strong> - Transliteration: bo (e.g., ぼく = boku)
            </li>
            <li>
              <strong>ぶ (Bu)</strong> - Transliteration: bu (e.g., ぶんか =
              bunka)
            </li>
            <li>
              <strong>ぱ (Pa)</strong> - Transliteration: pa (e.g., ぱん = pan)
            </li>
            <li>
              <strong>ぺ (Pe)</strong> - Transliteration: pe (e.g., ぺん = pen)
            </li>
            <li>
              <strong>ぴ (Pi)</strong> - Transliteration: pi (e.g., ぴん = pin)
            </li>
            <li>
              <strong>ぽ (Po)</strong> - Transliteration: po (e.g., ぽん = pon)
            </li>
            <li>
              <strong>ぷ (Pu)</strong> - Transliteration: pu (e.g., ぷん = pun)
            </li>
            <li>
              <strong>ぴゃ (Py)</strong> - Transliteration: pya (e.g., ぴゃ =
              pya)
            </li>
            <li>
              <strong>ぴゅ (Py)</strong> - Transliteration: pyu (e.g., ぴゅ =
              pyu)
            </li>
            <li>
              <strong>ぴょ (Py)</strong> - Transliteration: pyo (e.g., ぴょ =
              pyo)
            </li>
          </ul>
        </div>
        <div>
          <h1>Other Modifiers</h1>
          <p>
            <strong>っ (Small tsu)</strong> - Transliteration: silent, it
            doubles the next sound (e.g., きっぷ = kippu)
          </p>
          <p>
            <strong>ー (Long vowel)</strong> - Transliteration: long vowel, it
            lengthens the vowel sound just before it
          </p>
        </div>
      </div>
    </div>
  );
}
