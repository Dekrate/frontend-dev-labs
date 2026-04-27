import React from 'react';

const Article: React.FC = () => {
  return (
    <article className="flex-1 min-w-0" data-testid="main-article">
      <header className="mb-4 flex items-start gap-4">
        <h1 className="text-brand-blue text-2xl md:text-3xl font-normal leading-tight">
          Si meliora dies, ut vina, poemata reddit, scire velim, chartis pretium quotus arroget annus.
        </h1>
        <div className="shrink-0 mt-1">
          <img
            src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=120&q=80"
            alt="Jabłka"
            className="w-16 h-16 object-cover rounded-sm"
            loading="lazy"
          />
        </div>
      </header>

      <div className="text-sm text-text-body leading-relaxed space-y-4 text-justify">
        <p>
          Vilis atque novos? Excludat iurgia finis, "Est vetus atque probus, centum qui perficit annos." Quid, qui c
          nense vel anno, inter quos referendus erit? Veteresne poetas, an quos et praesens et postera
          srite quidem veteres inter ponetur honeste, qui vel mense brevi vel toto est iunior anno." Utor permisso,
          it equinae paulatim vello unum, demo etiam unum, dum cadat elusus ratione ruentis acervi, qui redit in
          aestimat annis miraturque nihil nisi quod Libitina sacravit.
        </p>
        <p>
          Ennius et sapines et fortis et alter Homerus, ut critici dicunt, leviter curare videtur, quo promissa c
          Pythagorea. Naevius in manibus non est et mentibus haeret paene recens? Adeo sanctum est vet
          ambigitur quotiens, uter utro sit prior, aufert Pacuvius docti famam senis Accius alti, dicitur Afrani
          Venandro, Plautus ad exemplar Siculi properare Epicharmi, vincere Caecilius gravitate.
        </p>
        <p>
          Hos ediscit et hos arto stipata theatro spectat Roma potens; habet hos numeratque poetas ad nos
          scriptoris ab aevo. Si meliora dies, ut vina, poemata reddit, scire velim, chartis pretium quotus arroge
          abhinc annos centum qui decidit, inter perfectos veteresque referri debet an inter vilis atque novos? Ex
          "Est vetus atque probus, centum qui perficit annos." Quid, qui deperit minor uno mense vel anno, inter
          erit? Veteresne poetas, an quos et praesens et postera respuat aetas?
        </p>
        <p>
          Hos ediscit et hos arto stipata theatro spectat Roma potens; habet hos numeratque poetas ad nos
          scriptoris ab aevo. Si meliora dies, ut vina, poemata reddit, scire velim, chartis pretium quotus arroge
          abhinc annos centum qui decidit, inter perfectos veteresque referri debet an inter vilis atque novos? Ex
          "Est vetus atque probus, centum qui perficit annos." Quid, qui deperit minor uno mense vel anno, inter
          erit? Veteresne poetas, an quos et praesens et postera respuat aetas?
        </p>
        <p>
          Vilis atque novos? Excludat iurgia finis, "Est vetus atque probus, centum qui perficit annos." Quid, qui c
          nense vel anno, inter quos referendus erit? Veteresne poetas, an quos et praesens et postera
          srite quidem veteres inter ponetur honeste, qui vel mense brevi vel toto est iunior anno." Utor permisso,
          it equinae paulatim vello unum, demo etiam unum, dum cadat elusus ratione ruentis acervi, qui redit in
        </p>
      </div>
    </article>
  );
};

export default Article;
