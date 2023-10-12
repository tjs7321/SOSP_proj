"""message

Revision ID: 46fc2b201ba9
Revises: d06a73b207b1
Create Date: 2023-10-11 17:11:16.453260

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '46fc2b201ba9'
down_revision = 'd06a73b207b1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('safety_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('phrase', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('safety_messages')
    # ### end Alembic commands ###