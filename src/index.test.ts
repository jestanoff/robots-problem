import processRobots from './'

describe('Martian Robots', () => {
  test('should work for example movements', () => {
    expect(
      processRobots(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`),
    ).toBe(`1 1 E
3 3 N LOST
2 3 S`)
  })

  test('should handle complex movements with multiple lost robots', () => {
    expect(
      processRobots(`5 3
0 0 N
FRFRFRFRFRFRFRFRFLFLFLFLFLFLFLRFRF

1 1 E
FFFFFFFFFFFFFFFFFFFFFFFFFFRLRLRLRLRL

2 2 S
LFFFFFFFFFFFFFFFFFFFFFFFFFFFFFRFRFRF

3 3 W
RFFFFFFFFFFFFFFFFFFFFFFFFFFFFFLFLFLF`),
    ).toBe(`0 1 W LOST
5 1 E LOST
5 2 E LOST
3 2 E`)
  })

  test('should work for another human tested case', () => {
    expect(
      processRobots(`10 10
1 0 N
FFRRFFF

1 3 S
FFFFRFF`),
    ).toBe(`1 0 S LOST
0 0 W LOST`)
  })
})
