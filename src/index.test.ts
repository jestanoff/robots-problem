import move from './';

describe('Martian Robots', () => {
  test.todo('test main functionality', () => {
    expect(move('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL')).toBe('1 1 E\n3 3 N LOST\n2 3 S')
  })

  test.todo('isRobotOffGrid')

  test.todo('areCoordinatesLastGoodLocation',)
})
