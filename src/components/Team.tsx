import { useTranslation } from 'next-i18next';

const Team = () => {
  const { t } = useTranslation(['welcome']);
  const members = [
    {
      name: t('Mila'),
      img: 'https://avatars.githubusercontent.com/u/85253058?v=4',
      info: '',
    },
    {
      name: t('Vitaliy'),
      img: 'https://avatars.githubusercontent.com/u/5475964?v=4',
      info: '',
    },
    {
      name: t('Zhanna'),
      img: 'https://avatars.githubusercontent.com/u/87633082?v=4',
      info: '',
    },
  ];
  return (
    <>
      <h2 className="mb-4 mt-20 text-center text-5xl text-gray-300">
        {t('team')}
      </h2>
      <div className="flex justify-between">
        {members.map((member) => {
          return (
            <div key={member.name} className="w-2/5">
              <img
                src={member.img}
                className="h-4/5 rounded-xl"
                alt={member.name}
              />
              <p className="mt-5 text-center text-2xl">{member.name}</p>
              <p>{member.info}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Team;
