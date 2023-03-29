<script>
	export let columnIndex;

	let color;

	$: if (columnIndex === 1 || columnIndex % 4 === 0) {
		color = 'bg-[#49C4E5]';
	} else if (columnIndex === 2 || columnIndex % 2 === 0) {
		color = 'bg-[#8471F2]';
	} else {
		color = 'bg-[#67E2AE]';
	}
</script>

<div class={'w-[15px] h-[15px] rounded-full ' + color} />
