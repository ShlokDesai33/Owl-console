export default function RenderTeams({ teams }: { teams: string[] | undefined }) {
  if (!teams) {
    return (
      <>
        <h4>Your Teams:</h4>
        <p className="mb-8 text-gray-text">Click on a team to copy to clipboard.</p>

        <div className="flex gap-y-6 gap-x-6 flex-wrap">
          <div className="rounded-full bg-gray-bg animate-pulse w-40 h-16"></div>
          <div className="rounded-full bg-gray-bg animate-pulse w-40 h-16"></div>
          <div className="rounded-full bg-gray-bg animate-pulse w-40 h-16"></div>
        </div>
      </>
    );
  }
  else if (teams.length === 0) {
    return (
      <>
        <h4>Your Teams:</h4>
        <h6 className="w-full text-center text-gray-text mt-8">Add an admin to see your teams.</h6>
      </>
    )
  }

  return (
    <>
      <h4>Your Teams:</h4>
      <p className="mb-8 text-gray-text">Click on a team to copy to clipboard.</p>

      <div className="flex gap-y-6 gap-x-6 flex-wrap">
        {teams.map(team => (
          <button className="rounded-full bg-gray-bg py-4 px-6 w-fit" onClick={e => {
            e.preventDefault();
            navigator.clipboard.writeText(team);
          }} key={team}>
            <h5 className="text-primary font-medium">{team}</h5>
          </button>
        ))}
      </div>
    </>
  );
}