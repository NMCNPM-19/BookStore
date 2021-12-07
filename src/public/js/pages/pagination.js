
exports.paginationFunc = (page, totalPage) => {
    var current = page,
        last = totalPage,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                if(l+1 === current)
                    rangeWithDots.push({item: l + 1, cur: true});
                else
                    rangeWithDots.push({item: l + 1, cur: false});
            } else if (i - l !== 1) {
                rangeWithDots.push({item: '...', cur: false});
            }
        }
        if(i === current)
            rangeWithDots.push({item: i, cur: true});
        else
            rangeWithDots.push({item: i, cur: false});
        l = i;
    }

    return rangeWithDots;
};

