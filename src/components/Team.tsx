import { useTranslation } from 'next-i18next';

const Team = () => {
  const { t } = useTranslation(['welcome']);
  const members = [
    {
      name: t('Mila'),
      img: 'https://avatars.githubusercontent.com/u/85253058?v=4',
      info: t('Mila_info'),
    },
    {
      name: t('Vitaliy'),
      img: 'https://avatars.githubusercontent.com/u/5475964?v=4',
      info: t('Vitaliy_info'),
    },
    {
      name: t('Zhanna'),
      img: 'https://avatars.githubusercontent.com/u/87633082?v=4',
      info: t('Zhanna_info'),
    },
  ];
  return (
    <>
      <h2 className="mb-4 mt-5 text-center text-5xl text-gray-300 md:mt-10 lg:mt-20">
        {t('team')}
      </h2>
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        {members.map((member) => {
          return (
            <div
              key={member.name}
              className="flex w-4/5 flex-col self-center sm:w-1/3 sm:self-auto"
            >
              <img
                src={member.img}
                className="h-auto rounded-xl"
                alt={member.name}
              />
              <p className="mt-5 text-center text-3xl">{member.name}</p>
              <p className="mt-3 text-center text-lg sm:mt-5 ">
                {t('responsible_for')}:
              </p>
              <p className="text-center text-2xl">{member.info}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Team;
