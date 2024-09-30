export const parseRegistrationCard = (dataArr: string[], enroll?: string) => {
	const subs = dataArr
		.map((s) =>
			s.match(/^(\d{1,2}[A-Z]{5,6}\d{3,5})([A-z\s\&\-]+)([a-d])(\d+\.\d+)$/),
		)
		.filter((i) => i !== null);

	console.log(`${subs.length} Subjects parsed`);

	const [course, branch] = dataArr[2].split(": ");
	const [_class, sno] = dataArr[4].split(": ")[1].split("-");

	const faculty = dataArr[3].match(/Faculty Number\: ([A-Z0-9]{10})/)?.[1];
	const enrollment =
		enroll || dataArr[3].match(/Enrolment Number\: ([A-Z0-9]{6})/)?.[1];
	const hall = dataArr[3].match(/Hall\: ([A-Z]{2})/)?.[1];

	return {
		subjects: subs.map((s) => ({
			code: s[1],
			subject: s[2],
			mode: s[3],
			credits: +s[4],
		})),
		college: dataArr[0],
		course,
		branch,
		name: dataArr[5].split(": ")[1],
		class: _class,
		serial: sno,
		faculty,
		enrollment,
		hall,
	};
};
