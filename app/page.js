"use client";

import { useState } from 'react';

const perguntas = [
  "過去に経験したつらい出来事やトラウマに関する望まない記憶や悪夢に悩まされる。",
  "トラウマを思い出したり、それを連想させる状況に触れると、恐怖や不安など強い感情反応が起きる。",
  "トラウマ体験を思い出させる場所、人、状況を意識的に避けている。",
  "困難な経験をして以来、人を信用したり新しい人間関係を築くのが難しいと感じる。",
  "トラウマ後、それまで楽しかった活動に対して前向きな感情や喜びを感じるのが難しくなった。",
  "最近、トラウマの記憶による苦痛から、死にたいと思ったり自傷行為を考えたことがある。", // FLAG
  "何か悪いことが再び起こるのではないかと常に緊張し、神経過敏や警戒心が強い状態が続いている。",
  "トラウマに関する記憶や考えのせいで、不眠や睡眠が浅くなるなど睡眠の変化が顕著に見られる。",
  "感情的に強い経験やトラウマをきっかけに、集中力や記憶力、注意力の問題が生じた。",
  "トラウマ体験後の恐怖や恥、苦痛により、感情的または社会的に自分を孤立させてしまう。"
];

export default function TesteTrauma() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) { // FLAG
      setResultado("赤");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("緑");
      else if (soma <= 35) setResultado("黄");
      else setResultado("赤");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">トラウマテスト</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              以下の状況が現在のあなたにどの程度当てはまるかを選んでください：<br />
              <strong>(1) まったくない | (2) たまにある | (3) 時々ある | (4) よくある | (5) ほとんど常にある</strong>
            </p>
          </div>

          <p className="mb-4">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const gradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br ${gradiente[num]}`}
                  style={{
                    width: `${30 + num * 5}px`,
                    height: `${30 + num * 5}px`,
                    fontSize: `${12 + num}px`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm">質問 {indiceAtual + 1} / {perguntas.length}</p>
        </>
      ) : (
        <>
          
          <h2 className="text-xl font-semibold mb-4 text-center">結果: {resultado}</h2>
          <img
            src={
              resultado === "緑"
                ? "/images/semaforo-verde.png"
                : resultado === "黄"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={`信号表示: ${resultado}`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "緑" && (
            <p className="text-center">あなたはこの問題に非常によく対処できており、感情的にも安定しています。他の人を支援することも可能です。</p>
          )}
          {resultado === "黄" && (
            <p className="text-center">取り組むべき感情的問題の兆候がありますが、決意と支援があれば克服可能です。</p>
          )}
          {resultado === "赤" && (
            <p className="text-center">この問題に関するあなたの感情的な問題は専門家の助けが必須です。早急に医師や心理士の支援を受けてください。</p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            テストをやり直す
          </button>
    
        </>
      )}
    </div>
  );
}
