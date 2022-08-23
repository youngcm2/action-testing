module.exports = async ({ context, core }) => {
  const { MAJOR, MINOR, PATCH, PR } = process.env;
  const { sha, payload } = context;

  console.log(context)

  if (PR) {
    const { title } = JSON.parse(PR);
    const regex =
      /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(-(?<preRelease>[^+]+))?(\+(?<build>.*))?/;
    const matches = regex.exec(title);

    core.info(matches);
    core.setOutput("semver", matches[0]);
    core.setOutput("short_sha", sha.substring(0, 7));
  } else {
    core.setOutput("semver", `${MAJOR}.${MINOR}.${PATCH}`);
    core.setOutput("short_sha", payload.before.substring(0, 7));
  }
};
