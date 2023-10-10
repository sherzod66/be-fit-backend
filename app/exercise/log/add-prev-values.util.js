export const addPrevValues = (log, prevLog) => {
	return log.times.map((item, index) => ({
		...item,
		prevWeight: prevLog ? prevLog.times[index].weight : 0,
		prevRepeat: prevLog ? prevLog.times[index].repeat : 0
	}))
}
