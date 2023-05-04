const Team = () => {
  const members = [
    {
      name: 'Ludmila Koseckaya',
      img: 'https://avatars.githubusercontent.com/u/85253058?v=4',
      info: '',
    },
    {
      name: 'Vitalii Ponomarov',
      img: 'https://avatars.githubusercontent.com/u/5475964?v=4',
      info: '',
    },
    {
      name: 'Zhanna Chaikovska',
      img: 'https://avatars.githubusercontent.com/u/87633082?v=4',
      info: '',
    },
  ];
  return (
    <>
      <h2 className="mb-4 mt-20 text-center text-5xl text-gray-300">Team</h2>
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
